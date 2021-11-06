/**
  * Route hub for assemling the different routers together.
  */

const express = require('express');
const apiRouter = require('./api');

const router = express.Router();
router.use('/api', apiRouter);

if (process.env.NODE_ENV === 'production') {
  const path = require('path');
  // Serve the frontend's index.html file at the root route
  router.get('/', (req, res) => {
    res.cookie('XSRF-TOKEN', req.csrfToken());
    return res.sendFile(
      path.resolve(__dirname, '../../frontend', 'build', 'index.html')
    );
  });

  // Serve the static assets in the frontend's build folder
  router.use(express.static(path.resolve('../frontend/build')));

  // Serve the frontend's index.html file at all other routes NOT starting with /api
  router.get(/^(?!\/?api).*/, (req, res) => {
    res.cookie('XSRF-TOKEN', req.csrfToken());
    return res.sendFile(
      path.resolve(__dirname, '../../frontend', 'build', 'index.html')
    );
  });
} else {
  router.get('/api/csrf/restore', (req, res) => {
    console.log('this route got hit | Setting Cookies For Dev Env');
    console.log('CSRF cookies on the incoming request:', req.cookies);
    const csrfToken = req.csrfToken();
    res.cookie('XSRF-TOKEN', csrfToken);
    console.log('CSRF cookies on the response:', res._headers['set-cookie']);
    return res.json({ msg: 'this is a test' });
  });
}

module.exports = router;
