const express = require('express');
const authController = require('../controllers/authController');
const radioStationController = require('../controllers/radioStationController');
const subscriptionsController = require('../controllers/subscriptionsController');
const radioShowRouter = require('./radioShowRoutes');

const router = express.Router({ mergeParams: true });

router.use('/:radioStationId/radioShows', radioShowRouter);

// FIXME: NEED TO ADD AUTHCONTROLLER AGAIN SO ONLY LOGGED IN USERS CAN USE THE APP....
router.use(authController.protect, subscriptionsController.subscriptionIsPaid);

router
  .route('/radioStations-within/:distance/centre/:latlng/unit/:unit')
  .get(radioStationController.getRadioStationsWithin);

// GET /api/v1/venues/{venueId}/{venueLatLng}/radioShows/radioShows-within/{distance}/unit/{unit}
router
  .route('/radioShowsByGenre-within/:distance/unit/:unit')
  .get(radioStationController.getRadioShowsNearVenue);

router
  .route('/')
  .get(radioStationController.getAllRadioStations)
  .post(radioStationController.createRadioStation);

router
  .route('/:id')
  .get(radioStationController.getRadioStation)
  .patch(
    authController.restrictTo('admin'),
    radioStationController.updateRadioStation,
  )
  .delete(
    authController.restrictTo('admin'),
    radioStationController.deleteRadioStation,
  );

module.exports = router;
