const express = require('express');
const venueReviewController = require('../controllers/venueReviewController');
const authController = require('../controllers/authController');

const router = express.Router({ mergeParams: true });

router.use(authController.protect);

router
  .route('/')
  .get(venueReviewController.getAllVenueReviews)
  .post(
    authController.restrictTo('user'),
    venueReviewController.setVenueUserIds,
    venueReviewController.createVenueReview,
  );

router
  .route('/:id')
  .get(venueReviewController.getVenueReview)
  .patch(
    authController.restrictTo('user', 'admin'),
    venueReviewController.updateVenueReview,
  )
  .delete(
    authController.restrictTo('user', 'admin'),
    venueReviewController.deleteVenueReview,
  );

module.exports = router;
