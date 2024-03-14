const mongoose = require('mongoose');
const validator = require('validator');

const venueUpdatesSchema = new mongoose.Schema(
  {
    venueName: {
      venueName: {
        type: String,
        required: [true, 'A venue must have a name'],
        trim: true,
      },
      user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
      },
    },

    address: {
      street: {
        street: {
          type: String,
          trim: true,
        },
        user: {
          type: mongoose.Schema.ObjectId,
          ref: 'User',
        },
      },
      city: {
        city: {
          type: String,
          required: [true, 'A venue must have a city'],
          trim: true,
        },
        user: {
          type: mongoose.Schema.ObjectId,
          ref: 'User',
        },
      },
      state: {
        state: {
          type: String,
          trim: true,
        },
        user: {
          type: mongoose.Schema.ObjectId,
          ref: 'User',
        },
      },
      country: {
        country: {
          type: String,
          required: [true, 'A venue must have a country'],
          trim: true,
        },
        user: {
          type: mongoose.Schema.ObjectId,
          ref: 'User',
        },
      },
      postcode: {
        postcode: {
          type: Number,
          required: [true, 'A venue must have a postcode'],
          trim: true,
        },
        user: {
          type: mongoose.Schema.ObjectId,
          ref: 'User',
        },
      },
    },
    venuePh: {
      venuePh: {
        type: String,
        trim: true,
      },
      user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
      },
    },
    venueEmail: {
      venueEmail: {
        type: String,
        trim: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email'],
      },
      user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
      },
    },
    website: {
      website: {
        type: String,
        trim: true,
      },
      user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
      },
    },
    bookingContact: {
      bookerName: {
        bookerName: {
          type: String,
          trim: true,
        },
        user: {
          type: mongoose.Schema.ObjectId,
          ref: 'User',
        },
      },
      bookerEmail: {
        bookerEmail: {
          type: String,
          trim: true,
        },
        user: {
          type: mongoose.Schema.ObjectId,
          ref: 'User',
        },
      },
      bookerPh: {
        bookerPh: {
          type: String,
          trim: true,
        },
        user: {
          type: mongoose.Schema.ObjectId,
          ref: 'User',
        },
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
    days: {
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
      user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
      },
    },
    originals: {
      originals: Boolean,
      user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
      },
    },
    soundSystemProvided: {
      soundSystemProvided: Boolean,
      user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
      },
    },
    capacity: {
      capacity: Number,
      user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
      },
    },
    genresSupported: {
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
      user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
      },
    },
    gigType: {
      gigType: {
        type: String,
        enum: ['ticketed', 'free-entry', 'both'],
      },
      user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
      },
    },
    confirmedData: {
      type: mongoose.Schema.ObjectId,
      ref: 'Venue',
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

venueUpdatesSchema.index({ location: '2dsphere' });

const VenueUpdates = mongoose.model('VenueUpdates', venueUpdatesSchema);

module.exports = VenueUpdates;
