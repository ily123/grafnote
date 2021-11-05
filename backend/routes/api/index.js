/**
  * Module that houses REST API routes.
  */
const router = require('express').Router();
const asyncHandler = require('express-async-handler');
const { User } = require('../../db/models');
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth.js');

router.post('/login', asyncHandler(async (req, res, next) => {
  const { credential, password } = req.body;
  console.log(credential);
  const user = await User.login({ credential, password });
  if (!user) {
    const err = new Error('Login failed');
    err.status = 401;
    err.title = 'Login failed';
    err.errors = ['Provided credentials are invalid.'];
    return next(err);
  }

  await setTokenCookie(res, user);
  return res.json({ user });
}));

router.delete('/logout', (req, res) => {
  res.clearCookie('token');
  return res.json({ message: 'success' });
});

router.post('/signup', asyncHandler(async (req, res) => {
  const { email, password, username } = req.body;
  const user = await User.signup({ email, username, password });
  await setTokenCookie(res, user);
  return res.json({ user });
}));

router.get('/session', restoreUser, (req, res) => {
  const { user } = req;
  if (!user) return res.json({});
  return res.json({ user: user.toSafeObject() });
});
// TODO -- these need to be made into actual unit tests:

router.get('/test', (req, res) => {
  res.json({ message: 'this is a test' });
});

router.get('/test-set-token', asyncHandler(async (req, res) => {
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
