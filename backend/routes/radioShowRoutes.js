const express = require('express');
const authController = require('../controllers/authController');
const radioShowController = require('../controllers/radioShowController');
const subscriptionsController = require('../controllers/subscriptionsController');

const router = express.Router({ mergeParams: true }); // gives access to radioStationId

// FIXME: TEMPORARY ALLOW ACCESS TO EVERYONE UNTIL CREATING LOGIN
router.use(authController.protect, subscriptionsController.subscriptionIsPaid);

router
  .route('/')
  .get(radioShowController.getAllRadioShows)
  .post(
    radioShowController.setRadioStationId,
    radioShowController.createRadioShow,
  );

// NOTE: MOVED TO radioStationRoutes
// // GET /api/v1/venues/{venueId}/{venueLatLng}/radioShows/radioShows-within/{distance}/unit/{unit}
// router
//   .route('/radioShows-within/:distance/unit/:unit')
//   .get(radioShowController.getRadioShowsNearVenue);

router
  .route('/radioShows-by-genre/:genres')
  .get(radioShowController.getRadioShowsByGenre);

router
  .route('/:id')
  .get(radioShowController.getRadioShow)
  .patch(
    authController.restrictTo('admin'),
    radioShowController.updateRadioShow,
  )
  .delete(
    authController.restrictTo('admin'),
    radioShowController.deleteRadioShow,
  );

module.exports = router;
