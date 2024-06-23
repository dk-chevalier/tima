const mongoose = require('mongoose');
const validator = require('validator');

const radioStationUpdatesSchema = new mongoose.Schema(
  {
    stationName: {
      stationName: {
        type: String,
        trim: true,
      },
      user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
      }
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
        }
      },
      city: {
        city: {
          type: String,
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
          trim: true,
        },
        user: {
          type: mongoose.Schema.ObjectId,
          ref: 'User',
        },
      },
    },
    stationPh: {
      stationPh: {
        type: String,
        trim: true,
      },
      user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
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
    musicSubmissions: {
      email: {
        email: {
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
      contactName: {
        contactName: {
          type: String,
          trim: true,
        },
        user: {
          type: mongoose.Schema.ObjectId,
          ref: 'User',
        },
      },
    },
    interviewRequests: {
      email: {
        email: {
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
      contactName: {
        contactName: {
          type: String,
          trim: true,
        },
        user: {
          type: mongoose.Schema.ObjectId,
          ref: 'User'
        },
      },
    },
    location: {
      type: {
        type: String,
        default: 'Point',
        enum: ['Point'],
      },
      coordinates: {
        type: [Number],
      }
    },
    confirmedData: {
      type: mongoose.Schema.ObjectId,
      ref: 'RadioStation'
    }
  },
  {
    toJSON: {virtuals: true},
    toObject: {virtuals: true},
  }
)

// populate with linked suggested radio shows
// TODO: stop from population the radioShow with the station information (as this is already in the radio staiton....)
radioStationUpdatesSchema.virtual('radioShows', {
  ref: 'RadioShowUpdates',
  foreignField: 'radioStation',
  localField: '_id',
});

const RadioStationUpdates = new mongoose.model('RadioStationUpdates', radioStationUpdatesSchema);

module.exports = RadioStationUpdates;