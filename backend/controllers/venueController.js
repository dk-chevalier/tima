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

// SUGGESTED UPDATES FROM USERS
exports.suggestedVenueUpdates = catchAsync(async (req, res, next) => {
  const venue = await Venue.findById(req.params.id);

  // TODO: add if no venue (perhaps make one function that will create new venue if one doesn't already exist)

  // UGLY CODE WITH ALL IF STATEMENTS....BUT SEEMS TO BE ONLY/BEST WAY TO DO THIS, AS NEED TO USE SAVE() (rather than update()) TO CHANGE THESE VALUES IN ORDER TO VALIDATORS TO WORK BY CHECKING THEY ARE DIFFERENT TO ALREADY CONFIRMED DATA.....

  // ALSO CAN'T SIMPLY PASS IN AN OBJECT OF SUGGESTED UPDATES, AS THIS WILL OVERRIDE ANY PREVIOUSLY WRITTEN UPDATES WITH BLANK VALUES IF THEY HAVEN'T BEEN SPECIFIED IN NEW SUGGESTIONS

  // ALSO ONLY WANT USER ID TO UPDATE FOR ANY CHANGED VALUES, SO AS TO KEEP TRACK OF WHO UPDATED WHAT INFO.....WILL BE USEFUL TO KNOW, ESPECIALLY IF DECIDE TO INCENTIVISE USERS TO PROVIDE UPDATES BY OFFERING DISCOUNTS ON EVERY UPDATE THEY PROVIDE

  // VENUE NAME UPDATE
  if (req.body.suggestedVenueName) {
    venue.suggestedUpdates.venueNameUpdate.venueName =
      req.body.suggestedVenueName;

    venue.suggestedUpdates.venueNameUpdate.user = req.user.id;
  }

  // STREET ADDRESS UPDATE
  if (req.body.suggestedStreet) {
    venue.suggestedUpdates.addressUpdates.streetUpdate.street =
      req.body.suggestedStreet;

    venue.suggestedUpdates.addressUpdates.streetUpdate.user = req.user.id;
  }

  // CITY UPDATE
  if (req.body.suggestedCity) {
    venue.suggestedUpdates.addressUpdates.cityUpdate.city =
      req.body.suggestedCity;

    venue.suggestedUpdates.addressUpdates.cityUpdate.user = req.user.id;
  }

  // STATE UPDATE
  if (req.body.suggestedState) {
    venue.suggestedUpdates.addressUpdates.stateUpdate.state =
      req.body.suggestedState;

    venue.suggestedUpdates.addressUpdates.stateUpdate.user = req.user.id;
  }

  // COUNTRY UPDATE
  if (req.body.suggestedCountry) {
    venue.suggestedUpdates.addressUpdates.countryUpdate.country =
      req.body.suggestedCountry;

    venue.suggestedUpdates.addressUpdates.countryUpdate.user = req.user.id;
  }
  // POSTCODE UPDATE
  if (req.body.suggestedPostcode) {
    venue.suggestedUpdates.addressUpdates.postcodeUpdate.postcode =
      req.body.suggestedPostcode;

    venue.suggestedUpdates.addressUpdates.postcodeUpdate.user = req.user.id;
  }

  // VENUE EMAIL UPDATE
  if (req.body.suggestedVenueEmail) {
    venue.suggestedUpdates.venueEmailUpdate.venueEmail =
      req.body.suggestedVenueEmail;

    venue.suggestedUpdates.venueEmailUpdate.user = req.user.id;
  }

  // WEBSITE UPDATE
  if (req.body.suggestedWebsite) {
    venue.suggestedUpdates.websiteUpdate.website = req.body.suggestedWebsite;

    venue.suggestedUpdates.websiteUpdate.user = req.user.id;
  }

  // BOOKER NAME UPDATE
  if (req.body.suggestedBookerName) {
    venue.suggestedUpdates.bookingContactUpdates.bookerNameUpdate.bookerName =
      req.body.suggestedBookerName;

    venue.suggestedUpdates.bookingContactUpdates.bookerNameUpdate.user =
      req.user.id;
  }

  // BOOKER EMAIL UPDATE
  if (req.body.suggestedBookerEmail) {
    venue.suggestedUpdates.bookingContactUpdates.bookerEmailUpdate.bookerEmail =
      req.body.suggestedBookerEmail;

    venue.suggestedUpdates.bookingContactUpdates.bookerEmailUpdate.user =
      req.user.id;
  }

  // BOOKER PHONE UPDATE
  if (req.body.suggestedBookerPh) {
    venue.suggestedUpdates.bookingContactUpdates.bookerPhUpdate.bookerPh =
      req.body.suggestedBookerPh;

    venue.suggestedUpdates.bookingContactUpdates.bookerPhUpdate.user =
      req.user.id;
  }

  // DAYS UPDATE
  if (req.body.suggestedDays) {
    venue.suggestedUpdates.daysUpdate.days = req.body.suggestedDays;

    venue.suggestedUpdates.daysUpdate.user = req.user.id;
  }

  // ORIGINALS UPDATE (have to do conditional like below, because if the suggestion is 'false' it wouldn't have run otherwise...this way it can not exist, therefore being a falsy value, without triggering the conditional statement still, but if the suggestion is set to false it will still trigger it)
  if (
    req.body.suggestedOriginals === true ||
    req.body.suggestedOriginals === false
  ) {
    venue.suggestedUpdates.originalsUpdate.originals =
      req.body.suggestedOriginals;

    venue.suggestedUpdates.originalsUpdate.user = req.user.id;
  }

  // SOUND SYSTEM PROVIDED UPDATE
  if (
    req.body.suggestedSoundSystemProvided === true ||
    req.body.suggestedSoundSystemProvided === false
  ) {
    venue.suggestedUpdates.soundSystemProvidedUpdate.soundSystemProvided =
      req.body.suggestedSoundSystemProvided;

    venue.suggestedUpdates.soundSystemProvidedUpdate.user = req.user.id;
  }

  // CAPACITY UPDATE
  if (req.body.suggestedCapacity) {
    venue.suggestedUpdates.capacityUpdate.capacity = req.body.suggestedCapacity;

    venue.suggestedUpdates.capacityUpdate.user = req.user.id;
  }

  // GENRES SUPPORTED UPDATE
  if (req.body.suggestedGenresSupported) {
    venue.suggestedUpdates.genresSupportedUpdate.genresSupported =
      req.body.suggestedGenresSupported;

    venue.suggestedUpdates.genresSupportedUpdate.user = req.user.id;
  }

  // GIG TYPE UPDATE
  if (req.body.suggestedGigType) {
    venue.suggestedUpdates.gigTypeUpdate.gigType = req.body.suggestedGigType;

    venue.suggestedUpdates.gigTypeUpdate.user = req.user.id;
  }

  await venue.save(); // have to use Model.save() (would also work with Model.create()), because otherwise the 'this' keyword in our validator function in the Schema won't point to the current model, and thus won't be able to compare it to already existing values....i.e. can't use the update() functions

  res.status(200).json({
    status: 'success',
    data: { venue },
  });
});
