const express = require('express');
const venueUpdatesController = require('../controllers/venueUpdatesController');
const authController = require('../controllers/authController');
const subscriptionsController = require('../controllers/subscriptionsController');
const radioStationRouter = require('./radioStationRoutes');

const router = express.Router();

router.use(authController.protect, subscriptionsController.subscriptionIsPaid);

// // GET RADIO SHOWS NEAR VENUE AND MATCHING USER GENRE
// // GET /api/v1/venues/{venueCoords}/radioShows/radioShows-within/{distance}/unit/{unit}
// router.use('/:venueId/:venueLatLng/radioStations', radioStationRouter);

router
  .route('/venues-within/:distance/centre/:latlng/unit/:unit')
  .get(authController.protect, venueUpdatesController.getVenueUpdatesWithin);

router
  .route('/')
  .get(venueUpdatesController.getAllVenueUpdates)
  // .get(venueController.getAllVenues)
  .post(authController.protect, venueUpdatesController.createVenueUpdates);

router
  .route('/:id')
  .get(venueUpdatesController.getVenueUpdates)
  .patch(
    authController.protect,
    // authController.restrictTo('admin'),
    venueUpdatesController.updateVenueUpdates,
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    venueUpdatesController.deleteVenueUpdates,
  );

// router.post(
//   '/suggest-new-venue',
//   authController.protect,
//   venueUpdatesController.suggestedVenueUpdates,
// );

// router.patch(
//   '/:id/suggest-venue-updates',
//   authController.protect,
//   venueUpdatesController.suggestedVenueUpdates,
// );

module.exports = router;
