const express = require('express');
const authController = require('../controllers/authController');
const radioStationController = require('../controllers/radioStationController');
const radioShowRouter = require('./radioShowRoutes');

const router = express.Router({ mergeParams: true });

router.use('/:radioStationId/radioShows', radioShowRouter);

router.use(authController.protect);

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
