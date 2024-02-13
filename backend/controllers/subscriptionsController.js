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

  res.status(200).json({
    status: 'success',
    data: {
      subscriptionId: subscription.id,
      clientSecret: subscription.latest_invoice.payment_intent.client_secret,
    },
  });
});
