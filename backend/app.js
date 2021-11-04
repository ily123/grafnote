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
const routes = require('./routes');
app.use(routes);

// catch unhandled requests
app.use((req, res, next) => {
  const err = new Error("The app doesn't know how to handle this request.");
  err.title = 'Resource not found.';
  err.errors = ['Resource not found.'];
  err.status = 404;
  next(err);
});

// return errors to the client
app.use(function (err, req, res, next) {
  // what if there are serveral errors?
  console.error(err.stack);
  res.status(500).json({ err, stack: err.stack });
});

module.exports = app;
