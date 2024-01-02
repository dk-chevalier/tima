const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitise = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const venueRouter = require('./routes/venueRoutes');
const userRouter = require('./routes/userRoutes');
const radioStationRouter = require('./routes/radioStationRoutes');
const radioShowRouter = require('./routes/radioShowRoutes');
const venueReviewRouter = require('./routes/venueReviewRoutes');

const app = express();

// 1) GLOBAL MIDDLEWARES

// CORS
app.use(cors());

app.options('*', cors());

// Set Security HTTP headers
app.use(helmet());

// Development Logging
if (process.env.NODE_ENV === 'development') {
  // morgan is a third-party middleware that logs information about the request for us
  app.use(morgan('dev'));
}

// Limit requests from same API
const limiter = rateLimit({
  max: 100, // max number of requests
  window: 60 * 60 * 1000, // timeframe for max requests in milliseconds
  message: 'Too many requests from this IP, please try again in an hour!',
});
app.use('/api', limiter);

// Body Parser
app.use(express.json({ limit: '10kb' }));

// Data Sanitisation against NoSQL query injection
app.use(mongoSanitise());

// Data Sanitisation against XSS
app.use(xss()); // DEPRECATED.....FIND AN ALTERNATIVE METHOD AT SOME POINT!!!!!!....still works though

// Prevent parameter pollution
app.use(
  hpp({
    whitelist: [], // pass in array of fields that we want to allow there to be duplicates of in the query string
  }),
);

// ROUTES

app.use('/api/v1/venues', venueRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/radioStations', radioStationRouter);
app.use('/api/v1/radioShows', radioShowRouter);
app.use('/api/v1/reviews', venueReviewRouter);

// ERROR HANDLING

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
