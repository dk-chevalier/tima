const express = require('express');
const radioStationUpdatesController = require('../controllers/radioStationUpdatesController');
const authController = require('../controllers/authController');
const subscriptionsController = require('../controllers/subscriptionsController');

const router = express.Router();

router.use(authController.protect, subscriptionsController.subscriptionIsPaid);

router
  .route('/')
  .get(radioStationUpdatesController.getAllRadioStationUpdates)
  .post(radioStationUpdatesController.createRadioStationUpdates);

router
  .route('/:stationId')
  .get(radioStationUpdatesController.getRadioStationUpdates)
  .patch(
    radioStationUpdatesController.setConfirmedDataId,
    radioStationUpdatesController.updateRadioStationUpdates,
  )
  .post(
    radioStationUpdatesController.setConfirmedDataId,
    radioStationUpdatesController.createRadioStationUpdates,
  )
  .delete(
    authController.restrictTo('admin'),
    radioStationUpdatesController.deleteRadioStationUpdates,
  );

module.exports = router;
