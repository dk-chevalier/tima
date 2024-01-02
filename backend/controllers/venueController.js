const Venue = require('../models/venueModel');
const APIFeatures = require('../utils/apiFeatures');
const factory = require('./handlerFactory');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

// CAN PROBABLY TURN getVenuesWithin INTO HANDLER FUNCTION FOR RADIO, MAGAZINES, etc. TOO
//   '/venues-within/:distance/centre/:latlng/unit/:unit'
// exports.getVenuesWithin = catchAsync(async (req, res, next) => {
//   const { distance, latlng, unit } = req.params;
//   const [lat, lng] = latlng.split(',');

//   const radius = unit === 'km' ? distance / 6378.1 : distance / 3963.2;

//   if (!lat || !lng) {
//     return next(
//       new AppError(
//         'Please provide a latitude and longitude in the format lat,lng',
//         400,
//       ),
//     );
//   }

//   const venues = await Venue.find({
//     location: { $geoWithin: { $centerSphere: [[lng, lat], radius] } },
//   });

//   res.status(200).json({
//     status: 'success',
//     results: venues.length,
//     data: {
//       data: venues,
//     },
//   });
// });

exports.getAllVenues = factory.getAll(Venue);
exports.getVenue = factory.getOne(Venue, {
  path: 'reviews',
  select: '-createdAt -__v',
});
exports.createVenue = factory.createOne(Venue);
exports.deleteVenue = factory.deleteOne(Venue);
exports.updateVenue = factory.updateOne(Venue);
exports.getVenuesWithin = factory.getDocumentsWithin(Venue);
