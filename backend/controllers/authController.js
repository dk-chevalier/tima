const crypto = require('crypto');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const AppError = require('../utils/appError');
const sendEmail = require('../utils/email');

// Create JWT
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, req, res) => {
  const token = signToken(user._id);

  // const cookieOptions = {
  //   expires: new Date(
  //     Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000,
  //   ),
  //   httpOnly: true,
  //   secure: req.secure || req.headers['x-forwarded-proto'] === 'https', // cookie only sent on an encrypted connection (i.e. when using https)....this won't work during development because we are only using http, not https
  // };

  // res.cookie('jwt', token, cookieOptions);
  res.cookie('jwt', token, {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000,
    ),
    withCredentials: true,
    httpOnly: true, // makes so cookie can't be access/modified in anyway by the browser
    // secure: req.secure || req.headers['x-forwarded-proto'] === 'https', // cookie only sent on an encrypted connection (i.e. when using https)....this won't work during development because we are only using http, not https

    // Had to add sameSite 'none' and secure true to have browser receive cookie....learn more about this!
    sameSite: 'none',
    secure: true,
  });

  // if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;
  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  // Create New User
  const newUser = await User.create({
    name: req.body.name,
    artistName: req.body.artistName,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    role: req.body.role, // FIXME: FIX THIS!!!!!!!! PROBABLY SHOULDN'T SEND THEM THEIR ROLE.....can perhaps do this be taking it oout of the response sent in createSendToken ????
    genres: req.body.genres,
  });

  newUser.genres.push('all', 'unknown');

  // Sign New User In with JWT and Send back Response
  createSendToken(newUser, 201, req, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // 1) Check if email/password exist
  if (!email || !password) {
    return next(new AppError('Please provide email and password!', 400));
  }

  // 2) Check if user exists and password = correct
  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401)); // ADD ERROR HANDLING
  }

  // 3) Send JWT to client (i.e. log them in)
  createSendToken(user, 200, req, res);
});

exports.restrictTo =
  (...roles) =>
  (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('You do not have permission to perform this action', 403),
      );
    }
    next();
  };

exports.protect = catchAsync(async (req, res, next) => {
  // 1) Check if token and getting it if there is
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt; // makes so we can get it from the cookie
  }

  if (!token) {
    return next(
      new AppError('You are not logged in! Please log in to get access.', 401),
    );
  }

  // 2) Verify token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3) Check if user still exists (hasn't been deleted since JWT issued)
  const currentUser = await User.findById(decoded.id);

  if (!currentUser) {
    return next(
      new AppError('The user belonging to this token no longer exists.', 401),
    );
  }

  // 4) Check if user changed password after JWT was issued (use Instance Method)
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError('User recently changed password! Please log in again', 401),
    ); // ADD ERROR HANDLING
  }

  // Grant Access to Protected Route
  req.user = currentUser;
  next();
});

// TODO: HAVE TO CHANGE THE EMAIL HOST ETC. USING NATOURS PROJECT ONE AT THE MOMENT!!!!!!!!!!!!!!!!!!!!!
exports.forgotPassword = catchAsync(async (req, res, next) => {
  // 1) Get user based on POSTed email
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new AppError('There is no user with that email address.', 404));
  }

  // 2) Generate the random reset token (will use an Instance Method here, as it is a bit cleaner to separate this into its own line of code because it is a few lines of code)

  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  // 3) Send it to the user's email
  const resetURL = `${req.protocol}://${req.get(
    'host',
  )}/api/v1/users/resetPassword/${resetToken}`;

  const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to : ${resetURL}.\nIf you didn't forget your password, please ignore this email!`;

  try {
    await sendEmail({
      email: user.email,
      subject: 'Your password reset token {valid for 10 min)',
      message,
    });

    res.status(200).json({
      status: 'success',
      message: 'Token sent to email!',
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return next(
      new AppError(
        'There was an error sending the email. Try again later!',
        500,
      ),
    );
  }
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  // 1) Get user based on the token
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  // 2) If token has not expired, and there is user, set the new password
  if (!user) {
    return next(new AppError('Token is invalid or has expired', 400));
  }
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  // 3) Update changedPasswordAt property for the user

  // 4) Log the user in, send JWT
  createSendToken(user, 200, res);
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  // 1) Get user from collection
  const user = await User.findById({ _id: req.user.id }).select('+password');

  console.log(user);

  // 2) Check if POSTed current password is correct
  if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
    return next(
      new AppError('Current password is incorrect. Please try again!', 401),
    );
  }
  // 3) If so, update password
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();

  // 4) Log user in, send JWT
  createSendToken(user, 200, res);
});
