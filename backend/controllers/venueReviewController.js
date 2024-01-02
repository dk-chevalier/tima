const VenueReview = require('../models/venueReviewModel');
const factory = require('./handlerFactory');

exports.setVenueUserIds = (req, res, next) => {
  if (!req.body.venue) req.body.venue = req.params.venueId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

exports.createVenueReview = factory.createOne(VenueReview);
exports.getAllVenueReviews = factory.getAll(VenueReview);
exports.getVenueReview = factory.getOne(VenueReview);
exports.updateVenueReview = factory.updateOne(VenueReview);
exports.deleteVenueReview = factory.deleteOne(VenueReview);
