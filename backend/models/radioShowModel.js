const mongoose = require('mongoose');
const validator = require('validator');

const radioShowSchema = new mongoose.Schema(
  {
    showName: {
      type: String,
      required: [true, 'A show must have a name'],
      trim: true,
    },
    hosts: [
      {
        name: String,
        email: {
          type: String,
          trim: true,
          lowercase: true,
          validate: [validator.isEmail, 'Please provide a valid email'],
        },
      },
    ],
    genresSupported: [
      {
        type: String,
        enum: [
          'pop',
          'hip-hop',
          'country',
          'rock',
          'indie',
          'electronic',
          'r&b',
          'folk',
          'soul',
          'metal',
          'reggae',
          'classical',
          'punk',
          'jazz',
          'funk',
          'disco',
          'blues',
          'acoustic',
          'singer-songwriter',
          'latin',
          'all',
          'unknown',
        ],
        // must erase unkown once genres are updated...user automatically has 'unknown' and 'all' genres so they will match with search involving these values
        default: 'unknown',
      },
    ],
    showEmail: {
      type: String,
      trim: true,
      lowercase: true,
      validate: [validator.isEmail, 'Please provide a valid email'],
    },
    showWebpage: String,
    radioStation: {
      type: mongoose.Schema.ObjectId,
      ref: 'RadioStation',
      required: [true, 'A radio show must belong to a station'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// populate the radioStation field with the name of the station that this radioShow is part of, and the location (i.e. coordinates) of that radioStation
radioShowSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'radioStation',
    select: 'stationName location',
  });
  next();
});

radioShowSchema.index({ genresPlayed: 1 });

const RadioShow = new mongoose.model('RadioShow', radioShowSchema);

module.exports = RadioShow;
