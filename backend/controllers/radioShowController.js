const RadioShow = require('../models/radioShowModel');
const APIFeatures = require('../utils/apiFeatures');
const factory = require('./handlerFactory');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const User = require('../models/userModel');
const RadioStation = require('../models/radioStationModel');
const Venue = require('../models/venueModel');

// save the id of the radioStation to the radioShow document (i.e. referencing it)
exports.setRadioStationId = (req, res, next) => {
  if (!req.body.radioStation) req.body.radioStation = req.params.radioStationId;
  next();
};

exports.getAllRadioShows = factory.getAll(RadioShow);
exports.getRadioShow = factory.getOne(RadioShow);
exports.createRadioShow = factory.createOne(RadioShow);
exports.deleteRadioShow = factory.deleteOne(RadioShow);
exports.updateRadioShow = factory.updateOne(RadioShow);
exports.getRadioShowsByGenre = factory.getDocumentsByGenres(RadioShow);

// // NOTE: MOVED TO radioStationController
// // Probably an inefficient way of doing this.....so perhaps change in future!!!!
// // GET /api/v1/venues/{venueId}/{venueLatLng}/radioShows/radioShows-within/{distance}/unit/{unit}
// exports.getRadioShowsNearVenue = catchAsync(async (req, res, next) => {
//   const genres = req.user.genres;
//   const [lat, lng] = req.params.venueLatLng.split(',');
//   if (!lat || !lng) {
//     return next(
//       new AppError(
//         'Please provide a latitude and longitude in the format lat,lng',
//         400,
//       ),
//     );
//   }

//   const { distance, unit } = req.params;

//   const radius = unit === 'km' ? distance / 6378.1 : distance / 3963.2;
//   // console.log(lat, lng, distance, unit, radius);

//   const radioStationsAndShows = await RadioStation.aggregate([
//     {
//       $match: {
//         location: { $geoWithin: { $centerSphere: [[+lng, +lat], radius] } },
//       },
//     },
//     {
//       $graphLookup: {
//         from: 'radioshows',
//         startWith: '$_id',
//         connectFromField: '_id',
//         connectToField: 'radioStation',
//         as: 'radioShows',
//         restrictSearchWithMatch: { genresSupported: { $in: genres } },
//       },
//     },
//     {
//       $project: {
//         address: 0,
//         location: 0,
//         _id: 0,
//         createdAt: 0,
//         __v: 0,
//         radioShows: {
//           _id: 0,
//           radioStation: 0,
//           hosts: 0,
//           __v: 0,
//         },
//       },
//     },
//   ]);

//   res.status(200).json({
//     status: 'success',
//     results: radioStationsAndShows.length,
//     data: {
//       radioStationsAndShows,
//     },
//   });
// });
