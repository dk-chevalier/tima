const mongoose = require('mongoose');
const validator = require('validator');

const venueSchema = new mongoose.Schema(
  {
    venueName: {
      type: String,
      // required: [true, 'A venue must have a name'],
      trim: true,
    },
    addressStr: {
      type: String,
      trim: true,
    },
    address: {
      street: {
        type: String,
        trim: true,
      },
      city: {
        type: String,
        // required: [true, 'A venue must have a city'],
        trim: true,
      },
      state: {
        type: String,
        trim: true,
      },
      country: {
        type: String,
        // required: [true, 'A venue must have a country'],
        trim: true,
      },
      postcode: {
        type: Number,
        // required: [true, 'A venue must have a postcode'],
        trim: true,
      },
    },

    venuePh: {
      type: String,
      trim: true,
    },
    venueEmail: {
      type: String,
      trim: true,
      lowercase: true,
      validate: [validator.isEmail, 'Please provide a valid email'],
    },
    website: {
      type: String,
      trim: true,
    },
    bookingContact: {
      bookerName: {
        type: String,
        trim: true,
      },
      bookerEmail: {
        type: String,
        trim: true,
      },
      bookerPh: {
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
          'A venue must have coordinates in the form [lng, lat]',
        ],
        default: [0, 0], // FIXME: this is temporary until having access to peromanent geocoding api from mapbox (can't legally store the data at the moment otherwise...)
      },
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'Rating must be above 1.0'],
      max: [5, 'Rating must be below 5.0'],
      set: (val) => Math.round(val * 10) / 10, // this will round the average to 1 decimal place for us
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    days: [
      {
        type: String,
        enum: [
          'monday',
          'tuesday',
          'wednesday',
          'thursday',
          'friday',
          'saturday',
          'sunday',
        ],
      },
    ],
    originals: Boolean,
    soundSystemProvided: Boolean,
    capacity: Number,
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
    gigType: {
      type: String,
      enum: ['ticketed', 'free-entry', 'both'],
    },
    suggestedUpdates: {
      type: mongoose.Schema.ObjectId,
      ref: 'VenueUpdates',
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

venueSchema.index({
  location: '2dsphere',
});

venueSchema.index({
  venueName: 'text',
  // FIXME: addressStr not working...???
  // i.e. it's not searching through addresses...
  addressStr: 'text',
});

venueSchema.virtual('reviews', {
  ref: 'VenueReview',
  foreignField: 'venue',
  localField: '_id',
});

const Venue = mongoose.model('Venue', venueSchema);

module.exports = Venue;
