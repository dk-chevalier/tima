const mongoose = require('mongoose');
const Venue = require('./venueModel');

const venueReviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      require: [true, 'Review cannot be empty!'],
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    venue: {
      type: mongoose.Schema.ObjectId,
      ref: 'Venue',
      required: [true, 'A review must belong to a tour'],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'A review must belong to a user'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

venueReviewSchema.index({ venue: 1, user: 1 }, { unique: true });

venueReviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'name',
  });

  next();
});

// calculating average ratings on the venue....doesn't seem to work when someone updates their review rating though....only when a new review is created?????
venueReviewSchema.statics.calcAvgRatings = async function (venueId) {
  const stats = await this.aggregate([
    {
      $match: { venue: venueId },
    },
    {
      $group: {
        _id: '$venue',
        nRating: { $sum: 1 },
        avgRating: { $avg: '$rating' },
      },
    },
  ]);

  console.log(stats);

  if (stats.length > 0) {
    await Venue.findByIdAndUpdate(venueId, {
      ratingsQuantity: stats[0].nRating,
      ratingsAverage: stats[0].avgRating,
    });
  } else {
    await Venue.findByIdAndUpdate(venueId, {
      ratingsQuantity: 0,
      ratingsAverage: 4.5,
    });
  }
};

venueReviewSchema.post('save', function () {
  this.constructor.calcAvgRatings(this.venue);
});

venueReviewSchema.pre(/^findOneAnd/, async function (next) {
  this.r = this.findOne();
  next();
});

venueReviewSchema.post(/^findOneAnd/, async function (next) {
  await this.r.constructor.calcAvgRatings(this.r.venue);
});
// END calcAvgRatings

const VenueReview = new mongoose.model('VenueReview', venueReviewSchema);

module.exports = VenueReview;
