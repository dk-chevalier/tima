const express = require('express');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const subscriptionsController = require('../controllers/subscriptionsController');

const router = express.Router();

router.get('/products', subscriptionsController.getSubscriptionProducts);

router.post('/webhooks', subscriptionsController.handleSubscriptionWebhooks);

router.post(
  '/create-subscription',
  authController.protect,
  subscriptionsController.createSubscription,
);

router.patch(
  '/cancel-subscription',
  authController.protect,
  subscriptionsController.cancelSubscriptionAtPeriodEnd,
);

module.exports = router;
