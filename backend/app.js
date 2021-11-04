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

module.exports = app;
