/**
  * Module that houses REST API routes.
  */
const router = require('express').Router();
const asyncHandler = require('express-async-handler');
const { User, Note } = require('../../db/models');
const { setTokenCookie, restoreUser } = require('../../utils/auth.js');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

// attach Notes routes to the API router
const notesRouter = require('./note.js');
router.use('/note', notesRouter);
const foldersRouter = require('./folder.js');
router.use('/folder', foldersRouter);

const validateLogin = [
  check('credential')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Please provide a valid email or username.'),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a password.'),
  handleValidationErrors
];

const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  handleValidationErrors
];

router.post('/login', validateLogin, asyncHandler(async (req, res, next) => {
  const { credential, password } = req.body;
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

router.post('/signup', validateSignup, async (req, res) => {
  const { email, password, username } = req.body;
  const user = await User.signup({ email, username, password });
  // create a welcome note as the 1st note for new user
  await Note.create({
    userId: user.id,
    title: 'Welcome!',
    content: 'This is your first note!'
  });
  await setTokenCookie(res, user);
  return res.json({ user });
});

router.get('/session', restoreUser, (req, res) => {
  const { user } = req;
  if (!user) return res.json({});
  return res.json({ user: user.toSafeObject() });
});

module.exports = router;
