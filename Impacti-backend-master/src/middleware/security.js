import jwt from 'jsonwebtoken';

const { getConfig } = require('../config/config');

const { User } = require('../models/User');

const {
  tokenFailed,
  tokenInvalid,
  userNotConfirmed,
  sessionTimeout,
} = require('../helpers/errors');

module.exports = {
  security: (req, res, next) => {
    const token = req.headers.authentication;

    if (token) {
      jwt.verify(token, getConfig('secret'), (err, decoded) => {
        if (err && err.name === 'TokenExpiredError') {
          return res
            .status(sessionTimeout.status)
            .send(sessionTimeout);
        } else if (err) {
          return res.status(tokenFailed.status).send(tokenFailed);
        }
        User.findById(decoded.id)
          .populate('organization')
          .then((user) => {
            if (!user) {
              return res
                .status(tokenInvalid.status)
                .send(tokenInvalid);
            }

            if (user.email && !user.emailConfirmed) {
              return res.status(userNotConfirmed.status).send(userNotConfirmed);
            }

            req.user = user;
            return next();
          });
      });
    } else {
      res.status(403).send({
        message: 'No token provided.',
      });
    }
  },
};
