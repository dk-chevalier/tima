const RadioStation = require('../models/radioStationModel');
const APIFeatures = require('../utils/apiFeatures');
const factory = require('./handlerFactory');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

// TODO: Probably an inefficient way of doing this.....so perhaps change in future!!!!
// GET /api/v1/venues/{venueId}/{venueLatLng}/radioStations/radioShows-within/{distance}/unit/{unit}
exports.getRadioShowsNearVenue = catchAsync(async (req, res, next) => {
  const genres = req.user.genres;
  const [lat, lng] = req.params.venueLatLng.split(',');
  if (!lat || !lng) {
    return next(
      new AppError(
        'Please provide a latitude and longitude in the format lat,lng',
        400,
      ),
    );
  }

  const { distance, unit } = req.params;

  const radius = unit === 'km' ? distance / 6378.1 : distance / 3963.2;
  // console.log(lat, lng, distance, unit, radius);

  const radioStationsAndShows = await RadioStation.aggregate([
    {
      $match: {
        location: { $geoWithin: { $centerSphere: [[+lng, +lat], radius] } },
      },
    },
    {
      $graphLookup: {
        from: 'radioshows',
        startWith: '$_id',
        connectFromField: '_id',
        connectToField: 'radioStation',
        as: 'radioShows',
        restrictSearchWithMatch: {
          genresSupported: { $in: genres },
        },
      },
    },
    {
      $project: {
        address: 0,
        location: 0,
        _id: 0,
        createdAt: 0,
        __v: 0,
        radioShows: {
          _id: 0,
          radioStation: 0,
          hosts: 0,
          __v: 0,
        },
      },
    },
  ]);

  res.status(200).json({
    status: 'success',
    results: radioStationsAndShows.length,
    data: {
      radioStationsAndShows,
    },
  });
});

exports.getAllRadioStations = factory.getAll(RadioStation);
exports.getRadioStation = factory.getOne(RadioStation, {
  path: 'radioShows',
  select: 'showName genresPlayed',
});
exports.createRadioStation = factory.createOne(RadioStation);
exports.deleteRadioStation = factory.deleteOne(RadioStation);
exports.updateRadioStation = factory.updateOne(RadioStation);
exports.getRadioStationsWithin = factory.getDocumentsWithin(RadioStation);
