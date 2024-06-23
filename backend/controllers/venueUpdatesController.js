const VenueUpdates = require('../models/venueUpdatesModel');
const Venue = require('../models/venueModel');
const APIFeatures = require('../utils/apiFeatures');
const factory = require('./handlerFactory');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.setConfirmedDataId = (req, res, next) => {
  if (!req.body.confirmedData) req.body.confirmedData = req.params.venueId;
  next();
};

exports.getAllVenueUpdates = factory.getAll(VenueUpdates);
exports.getVenueUpdates = factory.getOne(VenueUpdates, {
  path: 'confirmedData',
  select: '-createdAt -__v',
});
exports.deleteVenueUpdates = factory.deleteOne(VenueUpdates);
exports.getVenueUpdatesWithin = factory.getDocumentsWithin(VenueUpdates);
exports.createVenueUpdates = factory.createUpdatesDocument(VenueUpdates, Venue);
exports.updateVenueUpdates = factory.updateUpdatesDocument(VenueUpdates);


/*
exports.createVenueUpdates = catchAsync(async (req, res, next) => {
  
  // Takes request object, response, and next
  // Uses the body of the request object to CREATE the VenueUpdates document, 
  // and also stores the user id of whoever suggested each update
  // Sends a response object with status of 'success' and the data
  

  // create object in which to add the data to be stored, along with the user id where needed
  const body = {};

  // iterate through `key` `value` pairs in the `req.body` in order to build my own `body` object which has user id added
  for (const [key, value] of Object.entries(req.body)) {
    if (!value) continue;
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

  // create a VenueUpdates document with the newly created `body`
  const doc = await VenueUpdates.create(body);

  // if newly created VenueUpdates document is linked to existing venue, then add VenueUpdates id to the linked venue
  if (req.body.confirmedData) {
    await Venue.findByIdAndUpdate(req.body.confirmedData, {
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
*/

/*
exports.updateVenueUpdates = catchAsync(async (req, res, next) => {
  
  // Takes request object, response, and next
  // Uses the body of the request object to UPDATE VenueUpdates document, 
  // and also stores the user id of whoever suggested each update
  // Sends a response object with status of 'success' and the data
  

  // create object in which to add the data to be stored, along with the user id where needed
  const body = {};

  // iterate through `key` `value` pairs in the `req.body` in order to build my own `body` object which has user id added
  for (const [key, value] of Object.entries(req.body)) {
    // if `value` is empty or the current iteration is the id of the confirmed venue 
    // these don't need to be added to the VenueUpdates document so skip this iteration
    if (!value || key === 'confirmedData') continue;

    data = {};
    
    // if `key` is === 'address' or 'bookingContact', must further iterate through them, 
    // as they are themselves a nested object
    if (key === 'address' || key == 'bookingContact') {
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

  // update VenueUpdates document with the newly created `body`
  const doc = await VenueUpdates.findOneAndUpdate({confirmedData: req.body.confirmedData}, body);

  res.status(201).json({
    status: 'success',
    data: {
      data: doc,
    },
  });
});
*/