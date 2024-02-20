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
  console.log(req.user.stripeSubscriptionId);

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

  console.log(subscription);

  const endDate = new Date(subscription.cancel_at * 1000);

  const endDateStr = endDate.toDateString();

  res.status(200).json({
    status: 'success',
    data: {
      message: `Subscription canceled successfully. Your subscription will end on ${endDateStr}.`,
    },
  });
});

exports.handleSubscriptionWebhooks = catchAsync(async (req, res) => {
  const event = req.body;
  console.log(event);

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

  res.status(200).json({
    status: 'success',
  });
});
