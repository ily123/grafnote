const jwt = require('jsonwebtoken');
const { User } = require('../db/models');
const { jwtConfig: { secret, expiresIn }, environment } = require('../config');

const setTokenCookie = (res, user) => {
  const token = jwt.sign(
    { data: user.toSafeObject() },
    secret,
    { expiresIn: parseInt(expiresIn) }
  );

  const isProd = environment === 'production';

  res.cookie('token', token, {
    maxAge: expiresIn * 1000, // seconds to miliseconds
    httpOnly: true,
    secure: isProd,
    sameSite: isProd && 'Lax'
  });

  return token;
};

const restoreUser = (req, res, next) => {
  const { token } = req.cookies;

  return jwt.verify(token, secret, null, async (err, jwtPayload) => {
    if (err) return next();
    try {
      const { id } = jwtPayload.data;
      req.user = await User.scope('currentUser').findByPk(id);
    } catch (e) {
      res.clearCookie('token');
      return next();
    }
    if (!req.user) res.clearCookie('token');
    return next();
  });
};

const requireAuth = [
  restoreUser,
  function (req, res, next) {
    if (!req.user) {
      const err = new Error('Unauthorized');
      err.title = 'Unauthorized.';
      err.errors = ['Unauthorized.'];
      err.status = 401;
      return next(err);
    }
    return next();
  }
];

module.exports = { setTokenCookie, restoreUser, requireAuth };
