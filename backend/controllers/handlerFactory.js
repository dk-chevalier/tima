const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const APIFeatures = require('../utils/apiFeatures');

exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });

exports.getOne = (Model, popOptions) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (popOptions) query = query.populate(popOptions);

    const doc = await query;

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(new AppError('No document found with that ID!', 404));
    }

    res.status(204).json({
      status: 'success',
      data: null,
    });
  });

exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    if (req.body.genres) req.body.genres.push('all', 'unknown'); // makes sure that someone else can't get rid of 'all' or 'unknown' genre on the user (only works if only users have 'genres' field...rather than 'genresPlayed' etc.)
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doc) {
      return next(new AppError('No document found with that ID!', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });

exports.getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    const features = new APIFeatures(Model.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    // console.log(features.query);
    const doc = await features.query;

    // console.log(doc);

    res.status(200).json({
      status: 'success',
      results: doc.length,
      data: {
        data: doc,
      },
    });
  });

exports.getDocumentsWithin = (Model) =>
  catchAsync(async (req, res, next) => {
    const { distance, latlng, unit } = req.params;
    const [lat, lng] = latlng.split(',');

    const radius = unit === 'km' ? distance / 6378.1 : distance / 3963.2;

    if (!lat || !lng) {
      return next(
        new AppError(
          'Please provide a latitude and longitude in the format lat,lng',
          400,
        ),
      );
    }

    const docs = await Model.find({
      location: { $geoWithin: { $centerSphere: [[lng, lat], radius] } },
    });

    res.status(200).json({
      status: 'success',
      results: docs.length,
      data: {
        data: docs,
      },
    });
  });

exports.getDocumentsByGenres = (Model) =>
  catchAsync(async (req, res, next) => {
    let genres;
    if (req.params.genres === 'myGenres') {
      genres = req.user.genres;
    } else {
      genres = req.params.genres.split(','); // array of genres
    }

    if (genres === '') {
      return next(new AppError('Please select at least 1 genre', 400));
    }

    const docs = await Model.find({ genresSupported: { $in: genres } });

    res.status(200).json({
      status: 'success',
      results: docs.length,
      data: {
        data: docs,
      },
    });
  });

exports.createUpdatesDocument = (Model, ConfirmedDataModel) =>
  /*
    Takes a Model of an Updates document (e.g. VenueUpdates) as an argument, 
    allowing this same funciton to be used across multiple controllers.
    also takes the Model of the confirmed data version of...
    e.g. if `Model` === VenueUpdates, then `ConfirmedDataModel` === Venue
    */
  catchAsync(async (req, res, next) => {
    /*
      Takes request object, response, and next
      Uses the body of the request object to CREATE an Updates document, 
      and also stores the user id of whoever suggested each update
      Sends a response object with status of 'success' and the data
      */

    // create object in which to add the data to be stored, along with the user id where needed
    const body = {};
    console.log(req.body);

    // iterate through `key` `value` pairs in the `req.body` in order to build my own `body` object which has user id added
    for (const [key, value] of Object.entries(req.body)) {
      if (!value && value !== false) continue;
      data = {};
      if (key === 'confirmedData') {
        body[key] = value;
      } else if (typeof value === 'object') {
        for (const [key2, value2] of Object.entries(value)) {
          nestedData = {};
          nestedData[key2] = value2;
          nestedData['user'] = req.user.id;
          data[key2] = nestedData;
        }
        body[key] = data;
      } else {
        data[key] = value;
        data['user'] = req.user.id;
        body[key] = data;
      }
    }

    // create an Updates document with the newly created `body`
    const doc = await Model.create(body);

    // if newly created Updates document is linked to existing document of confirmed data, then add Updates document id to the linked confirmed data
    if (req.body.confirmedData) {
      await ConfirmedDataModel.findByIdAndUpdate(req.body.confirmedData, {
        suggestedUpdates: doc.id,
      });
    }

    res.status(201).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });

exports.updateUpdatesDocument = (Model) =>
  /*
    Takes a Model as an argument, allowing this same funciton to be used across multiple controllers
    */
  catchAsync(async (req, res, next) => {
    /*
      Takes request object, response, and next
      Uses the body of the request object to UPDATE an Updates document, 
      and also stores the user id of whoever suggested each update
      Sends a response object with status of 'success' and the data
      */

    // create object in which to add the data to be stored, along with the user id where needed
    const body = {};

    // iterate through `key` `value` pairs in the `req.body` in order to build my own `body` object which has user id added
    for (const [key, value] of Object.entries(req.body)) {
      // if `value` is empty or the current iteration is the id of the confirmed venue
      // these don't need to be added to the Updates document so skip this iteration
      if (value !== false && (!value || key === 'confirmedData')) continue;

      data = {};

      // if `value` === 'object', must further iterate through the nested object,
      if (typeof value === 'object') {
        for (const [key2, value2] of Object.entries(value)) {
          nestedData = {};
          nestedData[key2] = value2;
          nestedData['user'] = req.user.id;
          data[key2] = nestedData;
        }
        body[key] = data;
      } else {
        data[key] = value;
        data['user'] = req.user.id;
        body[key] = data;
      }
    }

    // update Updates document with the newly created `body`
    // FIXME: `doc` ends up being the non-updated document...so I am currently sending the document before it was updated...though it does update the document fine, just the response is the original data, not the updated one....
    const doc = await Model.findOneAndUpdate(
      { confirmedData: req.body.confirmedData },
      body,
    );

    res.status(201).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });
