/**
  * Module that houses REST API routes.
  */
const router = require('express').Router();
const asyncHandler = require('express-async-handler');
const { User } = require('../../db/models');
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth.js');

router.get('/test', (req, res) => {
  res.json({ message: 'this is a test' });
});

router.get('/test-auth-token', asyncHandler(async (req, res) => {
  const user = await User.findOne({
    where: { username: 'Demo-lition' }
  });
  setTokenCookie(res, user);
  return res.json({ user });
}));

router.get('/test-restore-user', restoreUser, asyncHandler(async (req, res) => {
  return res.json(req.user);
}));

router.get('/test-require-auth', requireAuth, asyncHandler(async (req, res) => {
  return res.json(req.user);
}));

module.exports = router;
