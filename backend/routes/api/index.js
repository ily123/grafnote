/**
  * Module that houses REST API routes.
  */
const router = require('express').Router();

router.post('/test', (req, res) => {
  res.json({ test: req.body });
});
module.exports = router;
