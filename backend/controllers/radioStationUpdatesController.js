const RadioStationUpdates = require('../models/radioStationUpdatesModel');
const RadioStation = require('../models/radioStationModel');
const factory = require('./handlerFactory');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.setConfirmedDataId = (req, res, next) => {
  if (!req.body.confirmedData) req.body.confirmedData = req.params.stationId;
  next();
};

exports.getAllRadioStationUpdates = factory.getAll(RadioStationUpdates);
exports.getRadioStationUpdates = factory.getOne(RadioStationUpdates, {
  path: 'confirmedData',
  select: '-createdAt -__v',
});
exports.deleteRadioStationUpdates = factory.deleteOne(RadioStationUpdates);
exports.createRadioStationUpdates = factory.createUpdatesDocument(RadioStationUpdates, RadioStation);
exports.updateRadioStationUpdates = factory.updateUpdatesDocument(RadioStationUpdates);
