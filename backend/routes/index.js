/**
  * Route hub for assemling the different routers together.
  */

const express = require('express');
const apiRouter = require('./api');

const router = express.Router();
router.use('/api', apiRouter);

router.get('/', (req, res) => {
  res.cookie('XSRF-TOKEN', req.csrfToken());
  res.send('This is a test');
});

module.exports = router;
