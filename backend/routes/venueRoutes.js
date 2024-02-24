const express = require('express');
const venueController = require('../controllers/venueController');
const authController = require('../controllers/authController');
const subscriptionsController = require('../controllers/subscriptionsController');
const radioStationRouter = require('./radioStationRoutes');
const venueReviewRouter = require('./venueReviewRoutes');

const router = express.Router();

router.use(authController.protect, subscriptionsController.subscriptionIsPaid);

// GET RADIO SHOWS NEAR VENUE AND MATCHING USER GENRE
// GET /api/v1/venues/{venueCoords}/radioShows/radioShows-within/{distance}/unit/{unit}
router.use('/:venueId/:venueLatLng/radioStations', radioStationRouter);

router.use('/:venueId/reviews', venueReviewRouter);

router
  .route('/venues-within/:distance/centre/:latlng/unit/:unit')
  .get(authController.protect, venueController.getVenuesWithin);

router
  .route('/')
  .get(venueController.getAllVenues)
  // .get(venueController.getAllVenues)
  .post(authController.protect, venueController.createVenue);

router
  .route('/:id')
  .get(venueController.getVenue)
  .patch(
    authController.protect,
    // authController.restrictTo('admin'),
    venueController.updateVenue,
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    venueController.deleteVenue,
  );

router.post(
  '/suggest-new-venue',
  authController.protect,
  venueController.suggestedVenueUpdates,
);

router.patch(
  '/:id/suggest-venue-updates',
  authController.protect,
  venueController.suggestedVenueUpdates,
);

module.exports = router;
