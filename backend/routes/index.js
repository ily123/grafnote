/**
  * Home page routes.
  */

const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.cookie('XSRF-TOKEN', req.csrfToken());
  res.send('This is a test');
});

module.exports = router;
