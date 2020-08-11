/* eslint-disable quotes */
/* eslint-disable no-underscore-dangle */
import sha from 'js-sha256';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import uuid from 'uuid/v4';
import emailValidator from 'email-validator';

const path = require('path');
const { User } = require('../../models/User');
const { State } = require('../../models/State');
const { Entity } = require('../../models/Entity');
const { Organization } = require('../../models/Organization');
const { Capacity } = require('../../models/Capacity');
const { getConfig } = require('../../config/config');
const { sendEmail } = require('../../helpers/mailer');
const {
  invalidCredentials,
  notFound,
  missingParameters,
  userNotConfirmed,
} = require('../../helpers/errors');
const passwordValidator = require('../../helpers/passwordValidator');

const validateLogin = request =>
  new Promise((resolve, reject) =>
    (emailValidator.validate(request.email) && request.password
      ? resolve({
        email: request.email,
        password: request.password,
        image: request.image,
        heroImage: request.heroImage,
      })
      : reject(missingParameters)),
  );

const validateEmail = request =>
  new Promise((resolve, reject) =>
    (emailValidator.validate(request.email)
      ? resolve({
        email: request.email,
      })
      : reject(missingParameters)),
  );

const validateUpdate = request =>
  new Promise((resolve, reject) =>
    ((request.email ? emailValidator.validate(request.email) : true) &&
    (request.password ? passwordValidator.validate(request.password) : true)
      ? resolve({
        email: request.email,
        password: request.password,
        username: request.username,
        image: request.image,
        heroImage: request.heroImage,
      })
      : reject(missingParameters)),
  );

const validateSignUp = request =>
  new Promise((resolve, reject) =>
    (emailValidator.validate(request.email) &&
    passwordValidator.validate(request.password) &&
    request.username
      ? resolve({
        email: request.email,
        password: request.password,
        username: request.username,
        image: request.image,
        heroImage: request.heroImage,
      })
      : reject(missingParameters)),
  );

const authenticateUser = (user, data) => new Promise(async (resolve, reject) => {
  try {
    if (!user.emailConfirmed) reject(userNotConfirmed);
    const match = await argon2.verify(user.password, sha(data.password));
    if (match) {
      resolve({
        user,
        token: jwt.sign({ id: user.id }, getConfig('secret'), {
          expiresIn: getConfig('tokenExpiresIn'),
        }),
        status: 'ok',
      });
    } else throw new Error(`Password did not match for user ${user.id}`);
  } catch (e) {
    console.error(e);
    reject(invalidCredentials);
  }
});

const createUser = data =>
  new Promise(async (resolve, reject) => {
    try {
      const user = new User({
        ...data,
        password: await argon2.hash(sha(data.password)),
        emailConfirmed: false,
        verificationCode: uuid(),
      });
      const { id: userId } = await user.save();

      const { id: capacityId } = await Capacity.find({ name: 'Division' });
      const organization = new Organization({
        owner: userId,
        capacity: capacityId,
      });
      const { id: organizationId } = await organization.save();

      user.organization = organizationId;

      await user.save();

      sendEmail.send({
        template: 'confirm',
        message: {
          from: getConfig('mailerUser'),
          to: data.email,
        },
        locals: {
          clientBaseUrl: getConfig('clientBaseUrl'),
          verificationCode: user.verificationCode,
          url: path.join(
            getConfig('clientBaseUrl'),
            'hello',
            user.verificationCode,
          ),
        },
      });

      resolve({
        token: jwt.sign({ id: user.id }, getConfig('secret'), {
          expiresIn: getConfig('tokenExpiresIn'),
        }),
        status: 'ok',
      });
    } catch (error) {
      console.log('error');
      reject(error);
    }
  });

const updateUser = (userId, { password, username, email, image, heroImage }, {
  changeEmail = false, changePassword = false,
} = {}) =>
  new Promise(async (resolve, reject) => {
    try {
      const properties = {
        ...(changePassword && { password: await argon2.hash(sha(password)) }),
        username,
        ...(changeEmail && { verificationCode: uuid(), email }),
        image,
        heroImage,
      };

      const updated = await User.findByIdAndUpdate(
        userId,
        { ...properties },
        { new: true, fields: { password: 0 } },
      );

      if (changeEmail) {
        sendEmail.send({
          template: 'confirm',
          message: {
            from: getConfig('mailerUser'),
            to: email,
          },
          locals: {
            clientBaseUrl: getConfig('clientBaseUrl'),
            verificationCode: updated.verificationCode,
            url: path.join(
              getConfig('clientBaseUrl'),
              'hello',
              updated.verificationCode,
            ),
          },
        });
      }

      resolve(updated);
    } catch (e) {
      reject(e);
    }
  });

const updatePassword = (
  userId, { password, email, verificationCode }) =>
  new Promise(async (resolve, reject) => {
    try {
      const originalUser = await User.findById(userId);

      const changePassword = password !== originalUser.password;

      const properties = {
        ...(changePassword && { password: await argon2.hash(sha(password)) }),
        verificationCode,
      };

      const updated = await User.findByIdAndUpdate(
        userId,
        { ...properties },
        { new: true },
        // { new: true, fields: { password: 0 } },
      );

      if (changePassword) {
        sendEmail.send({
          template: 'passwordChanged',
          message: {
            from: getConfig('mailerUser'),
            to: email,
          },
        });
      }

      resolve(updated);
    } catch (e) {
      reject(e);
    }
  });

const createEmptyUser = () =>
  new Promise(async (resolve) => {
    try {
      const userObj = new User();

      const { id: userId } = await userObj.save();

      const member = new Entity({ manager: userId });

      const { id: memberId } = await member.save();

      const state = new State({ member: memberId, route: 'assessment' });

      const { id: stateId } = await state.save();

      const organization = new Organization({
        owner: userId,
        rootMember: memberId,
      });

      const { id: organizationId } = await organization.save();

      const user = await User.findByIdAndUpdate(
        userId,
        {
          $set: { organization: organizationId },
          $addToSet: { states: [stateId] },
        },
        { new: true },
      ).populate('organization');

      resolve({
        token: jwt.sign({ id: userId }, getConfig('secret'), {
          expiresIn: getConfig('tokenExpiresIn'),
        }),
        user,
      });
    } catch (error) {
      console.log(error);
    }
  });

const confirmUser = token =>
  User.findOne({ verificationCode: token }).then(
    user =>
      new Promise((resolve, reject) =>
        (user
          ? User.findByIdAndUpdate(
            user.id,
            { emailConfirmed: true },
            { new: true, fields: { password: 0 } },
          ).then(found => resolve(found))
          : reject(notFound)),
      ),
  );

const checkToken = token =>
  User.findOne({ verificationCode: token }).then(
    user =>
      new Promise((resolve, reject) =>
        (user
          ? User.findById(user.id)
            .then(found => resolve(found))
          : reject(notFound)),
      ),
  );

const validateToken = (token) => {
  const decoded = jwt.verify(token, getConfig('passwordSecret'));

  const user = User.findById(decoded.id, { password: 0 });

  return user;
};

const checkAuth = async (req, res) => {
  const token = req.headers.authentication;
  if (token) {
    jwt.verify(token, getConfig('secret'), (err, decoded) => {
      if (err) {
        res.status(200).send({});
      } else {
        User.findById(decoded.id, { password: 0 })
          .populate('organization')
          .then((user) => {
            if (!user) {
              res.status(200).send({});
            }
            res.status(200).send({ user });
          });
      }
    });
  } else {
    res.status(200).send({});
  }
};

const sendPasswordResetEmail = data =>
  new Promise(async (resolve, reject) => {
    try {
      const user = await User.findOne({ email: { $regex: new RegExp(data.email, 'i') } });

      const token = jwt.sign({ id: user._id }, getConfig('passwordSecret'), {
        expiresIn: 60000,
      });

      const updateToken = await User.findByIdAndUpdate(
        user._id,
        { verificationCode: token },
        { fields: { password: 0, verificationCode: 0 } },
      );

      sendEmail.send({
        template: 'resetPassword',
        message: {
          from: getConfig('mailerUser'),
          to: user.email,
        },
        locals: {
          clientBaseUrl:
            getConfig('clientBaseUrl'),
          verificationCode: `${token}`,
          url: path.join(
            getConfig('clientBaseUrl'),
            'password_update',
            `${token}`,
          ),
        },
      });

      resolve(updateToken);
    } catch (e) {
      reject(e);
    }
  });

const extendToken = async (req, res) => {
  try {
    const token = req.headers.authentication;
    if (token) {
      jwt.verify(token, getConfig('secret'), (err, decoded) => {
        if (err) throw new Error(err);
        else {
          return res.status(200).send({ token: jwt.sign({ id: decoded.id }, getConfig('secret'), {
            expiresIn: getConfig('tokenExpiresIn'),
          }) });
        }
      });
    } else {
      return res.status(200).send({});
    }
  } catch (e) {
    console.error(e);
    res.status(500).send(e);
  }
};

module.exports = {
  authenticateUser,
  createUser,
  updateUser,
  createEmptyUser,
  validateLogin,
  validateEmail,
  validateSignUp,
  validateUpdate,
  confirmUser,
  validateToken,
  checkAuth,
  updatePassword,
  sendPasswordResetEmail,
  extendToken,
  checkToken,
};
