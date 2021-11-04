/**
  * Main app module that sets up middleware and routing.
  */
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

const { environment } = require('./config');
const routes = require('./routes');
const { ValidationError } = require('sequelize');

const isProduction = environment === 'production';

// instantiate app
const app = express();

// apply moddleware
app.use(morgan('dev')); // logging
app.use(cookieParser()); // cookies
app.use(express.json()); // application/json req body parser
if (!isProduction) app.use(cors()); // enable for cors for development
app.use(helmet({ contentSecurityPolicy: false })); // something to do with headers
app.use(csurf({ // creates _csrf cookie & req.csrfToken() method
  cookie: {
    secure: isProduction,
    sameSite: isProduction && 'Lax',
    httpOnly: true
  }
}));

// import and register routes
app.use(routes);

// catch unhandled requests
app.use((req, res, next) => {
  const err = new Error("The app doesn't know how to handle this request.");
  err.title = 'Resource not found.';
  err.errors = ['Resource not found.'];
  err.status = 404;
  next(err);
});

// catch sequelize errors
app.use((err, req, res, next) => {
  if (err instanceof ValidationError) {
    err.errors = err.errors.map(e => e.message);
    err.title = 'Sequelize Validation Error.';
  };
  next(err);
});

// return errors to the client
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500);
  const { title, message, errors, stack } = err;
  res.json({
    title,
    message,
    errors,
    stack: isProduction ? 'hidden in production' : stack
  });
});

module.exports = app;
