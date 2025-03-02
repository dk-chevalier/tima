const mongoose = require('mongoose');
const validator = require('validator');

const radioStationSchema = new mongoose.Schema(
  {
    stationName: {
      type: String,
      required: [true, 'A radio station must have a name'],
      trim: true,
    },
    address: {
      street: {
        type: String,
        trim: true,
      },
      city: {
        type: String,
        required: [true, 'A radio station must have a city'],
        trim: true,
      },
      state: {
        type: String,
        trim: true,
      },
      country: {
        type: String,
        required: [true, 'A radio station must have a country'],
        trim: true,
      },
      postcode: {
        type: Number,
        required: [true, 'A radio station must have a postcode'],
        trim: true,
      },
    },
    addressStr: {
      type: String,
      trim: true,
    },
    stationPh: {
      type: String,
      trim: true,
    },
    stationEmail: {
      type: String,
      trim: true,
    },
    website: {
      type: String,
      trim: true,
    },
    musicSubmissions: {
      email: {
        type: String,
        trim: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email'],
      },
      contactName: {
        type: String,
        trim: true,
      },
    },
    interviewRequests: {
      email: {
        type: String,
        trim: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email'],
      },
      contactName: {
        type: String,
        trim: true,
      },
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    location: {
      type: {
        type: String,
        default: 'Point',
        enum: ['Point'],
      },
      coordinates: {
        type: [Number],
        required: [
          true,
          'A radio station must have coordinates in the form [lng, lat]',
        ],
      },
    },
    // radioShows: [
    //   {
    //     type: mongoose.Schema.ObjectId,
    //     ref: 'RadioShow',
    //   },
    // ],
    suggestedUpdates: {
      type: mongoose.Schema.ObjectId,
      ref: 'RadioStationUpdates',
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

radioStationSchema.index({ location: '2dsphere' });

// TODO: Stop from populating the radioshow with the station information (as this is already inside the radioStation....)
radioStationSchema.virtual('radioShows', {
  ref: 'RadioShow',
  foreignField: 'radioStation',
  localField: '_id',
});

const RadioStation = new mongoose.model('RadioStation', radioStationSchema);

module.exports = RadioStation;
