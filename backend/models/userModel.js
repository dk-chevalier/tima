const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please tell us your name'],
  },
  artistName: {
    type: String,
  },
  genres: [
    {
      type: String,
      enum: [
        'pop',
        'hip-hop',
        'country',
        'rock',
        'indie',
        'electronic',
        'psychedelic',
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
      // User must always have 'all' and 'unkown' genres, therefore pr and venue contacts show up to which we don't know their genres, or they simply support all genres
      default: ['all', 'unknown'],
    },
  ],
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  photo: String,
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minLength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      validator: function (el) {
        // this checks if the passwordConfirm matches the password....
        // THIS ONLY WORKS ON SAVE and CREATE!!...so whenever we want to update a user we will have to use .save() (and .create()), rather than find a user and .update()
        return el === this.password;
      },
      message: 'Passwords are not the same',
    },
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
  stripeCustomerId: {
    type: String,
  },
  stripeSubscriptionId: {
    type: String,
  },
  accountPaid: {
    type: Boolean,
    default: false,
    required: true,
  },
});

// MIDDLEWARES

userSchema.index({ stripeCustomerId: 1 });

// Encrypt Password
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;

  next();
});

// Update passwordChangedAt
userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

userSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  next();
});

// Instance Method to check if password is correct
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword,
) {
  // console.log(candidatePassword, userPassword);
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  ///////////
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10,
    );
    return JWTTimestamp < changedTimestamp;
  }

  return false;
};

// Instance Method to create a reset token for forgotten passwords
userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex'); // uses nodes built in crypto package

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
