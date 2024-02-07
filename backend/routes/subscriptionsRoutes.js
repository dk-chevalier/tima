const express = require('express');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const {
  getSubscriptionProducts,
} = require('../controllers/subscriptionsController');

const router = express.Router();

router.get('/products', getSubscriptionProducts);

module.exports = router;
