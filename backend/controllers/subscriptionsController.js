const User = require('../models/userModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.getSubscriptionProducts = catchAsync(async (req, res) => {
  const products = await stripe.products.list({
    apiKey: process.env.STRIPE_SECRET_KEY,
  });

  const prices = await stripe.prices.list({
    apiKey: process.env.STRIPE_SECRET_KEY,
  });

  return res
    .status(200)
    .json({ status: 'success', data: { products, prices } });
});

exports.createSubscription = catchAsync(async (req, res) => {
  console.log(req.user.stripeCustomerId);
  console.log(req.body.stripePriceId);

  const subscription = await stripe.subscriptions.create({
    customer: req.user.stripeCustomerId,
    items: [
      {
        price: req.body.stripePriceId,
      },
    ],
    payment_behavior: 'default_incomplete',
    payment_settings: { save_default_payment_method: 'on_subscription' },
    expand: ['latest_invoice.payment_intent'],
  });

  // storing subscription ID so it is easier to find and update/cancel subscriptions
  const user = await User.findByIdAndUpdate(req.user.id, {
    stripeSubscriptionId: subscription.id,
  });

  console.log(user);

  res.status(200).json({
    status: 'success',
    data: {
      subscriptionId: subscription.id,
      clientSecret: subscription.latest_invoice.payment_intent.client_secret,
    },
  });
});

exports.subscriptionIsPaid = (req, res, next) => {
  if (!req.user.accountPaid) {
    return next(
      new AppError(
        'Subscription has not been paid. Please check your account details and try again.',
        401,
      ),
    );
  }

  next();
};

exports.cancelSubscriptionAtPeriodEnd = catchAsync(async (req, res, next) => {
  // console.log(req.user.stripeSubscriptionId);

  const subscription = await stripe.subscriptions.update(
    req.user.stripeSubscriptionId,
    {
      cancel_at_period_end: true,
    },
  );

  if (!subscription)
    new AppError(
      'There was a problem canceling your subscription, please try again or contact us for help',
      401,
    );

  // console.log(subscription);

  const endDate = new Date(subscription.cancel_at * 1000);

  const endDateStr = endDate.toDateString();

  res.status(200).json({
    status: 'success',
    data: {
      message: `Subscription canceled successfully. Your subscription will end on ${endDateStr}.`,
    },
  });
});

exports.updateSubscriptionPaymentDetails = catchAsync(async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'setup',
    customer: req.user.stripeCustomerId,
    setup_intent_data: {
      metadata: {
        customer_id: req.user.stripeCustomerId,
        subscription_id: req.user.stripeSubscriptionId,
      },
    },
    success_url: req.body.url,
    cancel_url: req.body.url,
  });

  console.log(session);

  res.status(200).json({
    status: 'success',
    data: { sessionId: session.id },
  });
});

exports.handleSubscriptionWebhooks = catchAsync(async (req, res) => {
  /*
  stripe listen --events invoice.paid,invoice.payment_failed,customer.subscription.deleted,checkout.session.completed --forward-to localhost:8000/api/v1/subscriptions/webhooks
  */
  const event = req.body;

  // const user = await User.findOne({
  //   stripeCustomerId: event.data.object.customer,
  // });

  // console.log(user);

  // Payment success
  if (event.type === 'invoice.paid' && event.data.object.paid === true) {
    await User.updateOne(
      { stripeCustomerId: event.data.object.customer },
      // change accountPaid to allow access to app
      { $set: { accountPaid: true } },
    );
  }

  // Payment failure
  if (
    event.type === 'invoice.payment_failed' &&
    event.data.object.paid === true
  ) {
    await User.updateOne(
      { stripeCustomerId: event.data.object.customer },
      { $set: { accountPaid: false } },
    );
  }

  // Subscription Ended
  if (event.type === 'customer.subscription.deleted') {
    await User.updateOne(
      { stripeCustomerId: event.data.object.customer },
      { $set: { accountPaid: false } },
    );
  }

  // Checkout Session Completed (USING FOR UPDATING PAYMENT DETAILS)
  if (event.type === 'checkout.session.completed') {
    const setupIntentId = event.data.object.setup_intent;

    // get setup_intent, which gives access to customer id, subscription id, and payment method id
    const setupIntent = await stripe.setupIntents.retrieve(setupIntentId);

    console.log(setupIntent);

    const subscription = await stripe.subscriptions.update(
      setupIntent.metadata.subscription_id,
      { default_payment_method: setupIntent.payment_method },
    );
  }

  res.status(200).json({
    status: 'success',
  });
});
