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

// THINK I HAVE TO CHANGE BELOW....because currently same as venues search
// router
//   .route('/venues-within/:distance/centre/:latlng/unit/:unit')
//   .get(authController.protect, venueUpdatesController.getVenueUpdatesWithin);

router
  .route('/')
  .get(venueUpdatesController.getAllVenueUpdates)
  .post(
    venueUpdatesController.createVenueUpdates,
  );
// .get(venueController.getAllVenues)

router
  .route('/:venueId')
  .get(venueUpdatesController.getVenueUpdates)
  .patch(
    venueUpdatesController.setConfirmedDataId,
    venueUpdatesController.updateVenueUpdates,
  )
  .post(
    venueUpdatesController.setConfirmedDataId,
    venueUpdatesController.createVenueUpdates,
  )
  .delete(
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
