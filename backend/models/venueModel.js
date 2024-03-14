const mongoose = require('mongoose');
const validator = require('validator');

const venueSchema = new mongoose.Schema(
  {
    venueName: {
      type: String,
      // required: [true, 'A venue must have a name'],
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
      venueNameUpdate: {
        venueName: {
          type: String,
          trim: true,
          validate: {
            validator: function (el) {
              return el !== this.venueName; // only works with Model.save() or Model.create() (otherwise the 'this' doesn't point to the current document, but something else, so can't compare to an already existing value...)
            },
            message:
              'Suggested venue name must be different to the currently confirmed venue name',
          },
        },
        user: {
          type: mongoose.Schema.ObjectId,
          ref: 'User',
        },
      },
      addressUpdates: {
        streetUpdate: {
          street: {
            type: String,
            trim: true,
            validate: {
              validator: function (el) {
                return el !== this.address.street;
              },
              message:
                'Suggested street address must be different to currently confirmed street address',
            },
          },
          user: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
          },
        },
        cityUpdate: {
          city: {
            type: String,
            trim: true,
            validate: {
              validator: function (el) {
                return el !== this.address.city;
              },
              message:
                'Suggested city must be different to currently confirmed city',
            },
          },
          user: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
          },
        },
        stateUpdate: {
          state: {
            type: String,
            trim: true,
            validate: {
              validator: function (el) {
                return el !== this.address.state;
              },
              message:
                'Suggested state must be different to currently confirmed state',
            },
          },
          user: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
          },
        },
        countryUpdate: {
          country: {
            type: String,
            trim: true,
            validate: {
              validator: function (el) {
                return el !== this.address.country;
              },
              message:
                'Suggested country must be different to currently confirmed country',
            },
          },
          user: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
          },
        },
        postcodeUpdate: {
          postcode: {
            type: Number,
            trim: true,
            validate: {
              validator: function (el) {
                return el !== this.address.postcode;
              },
              message:
                'Suggested postcode must be different to currently confirmed postcode',
            },
          },
          user: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
          },
        },
      },
      venueEmailUpdate: {
        venueEmail: {
          type: String,
          trim: true,
          lowercase: true,
          validate: {
            validator: function (el) {
              return el !== this.venueEmail;
            },
            message:
              'Suggested venue email must be different to currently confirmed venue email',
          },
        },
        user: {
          type: mongoose.Schema.ObjectId,
          ref: 'User',
        },
      },
      websiteUpdate: {
        website: {
          type: String,
          trim: true,
          validate: {
            validator: function (el) {
              return el !== this.website;
            },
            message:
              'Suggested website must be different to currently confirmed website',
          },
        },
        user: {
          type: mongoose.Schema.ObjectId,
          ref: 'User',
        },
      },
      bookingContactUpdates: {
        bookerNameUpdate: {
          bookerName: {
            type: String,
            trim: true,
            validate: {
              validator: function (el) {
                return el !== this.bookingContact.bookerName;
              },
              message:
                'Suggested booker name must be different to currently confirmed booker name',
            },
          },
          user: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
          },
        },
        bookerEmailUpdate: {
          bookerEmail: {
            type: String,
            trim: true,
            validate: {
              validator: function (el) {
                return el !== this.bookingContact.bookerEmail;
              },
              message:
                'Suggested booker email must be different to currently confirmed booker email',
            },
          },
          user: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
          },
        },
        bookerPhUpdate: {
          bookerPh: {
            type: String,
            trim: true,
            validate: {
              validator: function (el) {
                return el !== this.bookingContact.bookerPh;
              },
              message:
                'Suggested booker phone number must be different to currently confirmed booker phone number',
            },
          },
          user: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
          },
        },
      },
      locationUpdate: {
        location: {
          type: {
            type: String,
            default: 'Point',
            enum: ['Point'],
          },
          coordinates: {
            type: [Number],
          },
        },
        user: {
          type: mongoose.Schema.ObjectId,
          ref: 'User',
        },
      },
      daysUpdate: {
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
            // VALIDATOR CHECKS THAT SUGGESTED DAYS ARE NOT ALREADY CONFIRMED DAYS....
            // TODO: STILL NEED TO FIND A WAY FOR PEOPLE TO SUGGEST THAT THE VENUE NO LONGER HAS LIVE MUSIC ON CERTAIN DAYS THAT ARE IN THE CONFIRMED LIST
            validate: {
              validator: function (el) {
                return !this.days.includes(el);
              },
              message:
                'You can only suggest days that are not already confirmed days that the venue has live music',
            },
          },
        ],
        user: {
          type: mongoose.Schema.ObjectId,
          ref: 'User',
        },
      },
      originalsUpdate: {
        originals: {
          type: Boolean,
          validate: {
            validator: function (el) {
              return el !== this.originals;
            },
            message:
              'Suggested status of venues support for original music must be different to currently confirmed status',
          },
        },
        user: {
          type: mongoose.Schema.ObjectId,
          ref: 'User',
        },
      },
      soundSystemProvidedUpdate: {
        soundSystemProvided: {
          type: Boolean,
          validate: {
            validator: function (el) {
              return el !== this.soundSystemProvided;
            },
            message:
              'Suggested status of whether the venues supplies a PA must be different to currently confirmed status',
          },
        },
        user: {
          type: mongoose.Schema.ObjectId,
          ref: 'User',
        },
      },
      capacityUpdate: {
        capacity: {
          type: Number,
          validate: {
            validator: function (el) {
              return el !== this.capacity;
            },
            message:
              'Suggested venue capacity must be different to currently confirmed capacity',
          },
        },
        user: {
          type: mongoose.Schema.ObjectId,
          ref: 'User',
        },
      },
      genresSupportedUpdate: {
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
            // VALIDATOR CHECKS THAT SUGGESTED SUPPORTED GENRES ARE NOT ALREADY CONFIRMED SUPPORTED GENRES....
            // TODO: STILL NEED TO FIND A WAY FOR PEOPLE TO SUGGEST THAT THE VENUE NO LONGER SUPPORTS CERTAIN GENRES THAT ARE IN THE CONFIRMED LIST
            validate: {
              validator: function (el) {
                return !this.genresSupported.includes(el);
              },
              message:
                'You can only suggest genres that are not already confirmed genres that the venue supports',
            },
          },
        ],
        user: {
          type: mongoose.Schema.ObjectId,
          ref: 'User',
        },
      },
      gigTypeUpdate: {
        gigType: {
          type: String,
          enum: ['ticketed', 'free-entry', 'both'],
          validate: {
            validator: function (el) {
              return el !== this.gigType;
            },
            message:
              'Suggested venue gig type must be different to currently confirmed gig type',
          },
        },
        user: {
          type: mongoose.Schema.ObjectId,
          ref: 'User',
        },
      },
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

venueSchema.index({ location: '2dsphere' });

venueSchema.virtual('reviews', {
  ref: 'VenueReview',
  foreignField: 'venue',
  localField: '_id',
});

const Venue = mongoose.model('Venue', venueSchema);

module.exports = Venue;
