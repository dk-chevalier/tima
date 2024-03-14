const VenueUpdates = require('../models/venueUpdatesModel');
const APIFeatures = require('../utils/apiFeatures');
const factory = require('./handlerFactory');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getAllVenueUpdates = factory.getAll(VenueUpdates);
exports.getVenueUpdates = factory.getOne(VenueUpdates, {
  path: 'confirmedData',
  select: '-createdAt -__v',
});
exports.createVenueUpdates = factory.createOne(VenueUpdates);
exports.deleteVenueUpdates = factory.deleteOne(VenueUpdates);
exports.updateVenueUpdates = factory.updateOne(VenueUpdates);
exports.getVenueUpdatesWithin = factory.getDocumentsWithin(VenueUpdates);
