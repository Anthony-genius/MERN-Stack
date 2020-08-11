/* eslint-disable quotes */
/* eslint-disable no-underscore-dangle */
import express from 'express';

const {
  User,
} = require('../models/User');

const {
  authenticateUser,
  createEmptyUser,
  updateUser,
  validateUpdate,
  validateSignUp,
  validateEmail,
  validateLogin,
  confirmUser,
  checkAuth,
  sendPasswordResetEmail,
  updatePassword,
  validateToken,
  extendToken,
  checkToken,
} = require('../components/user/auth');

const router = express.Router({
  mergeParams: true,
});

/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     tags: [AUTH]
 *     description: Login to the application
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: username
 *         description: Username to use for login.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: email
 *         description: Email to use for login.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: password
 *         description: User's password.
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: login
 */
router.get('/', (req, res) => checkAuth(req, res));

/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     tags: [AUTH]
 *     description: Login to the application
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: username
 *         description: Username to use for login.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: email
 *         description: Email to use for login.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: password
 *         description: User's password.
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: login
 */
router.post('/sign-up', async (req, res) => {
  try {
    const data = await validateSignUp(req.body);
    const response = await updateUser(req.user.id, data, {
      changeEmail: true, changePassword: true,
    });

    res.status(200).send(response);
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
});

/**
 * @swagger
 * /api/auth/update:
 *   post:
 *     tags: [AUTH]
 *     description: Updates a user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: username
 *         description: Username to use for login.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: email
 *         description: Email to use for login.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: password
 *         description: User's password.
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: login
 */
router.post('/update', async (req, res) => {
  try {
    const data = await validateUpdate(req.body);
    const response = await updateUser(req.user.id, data);

    res.status(200).send(response);
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
});

/**
 *  @swagger
 * /api/auth/empty:
 *   post:
 *     description: Creates an empty user
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: empty user
 */
router.post('/empty', (req, res) => {
  createEmptyUser()
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((error) => {
      res.status(error.status).send(error);
    });
});

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     tags: [AUTH]
 *     description: Login to the application
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: email
 *         description: Email to use for login.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: password
 *         description: User's password.
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: login
 */
router.post('/login', (req, res) => {
  validateLogin(req.body)
    .then(data =>
      User.findOne({ email: { $regex: new RegExp(data.email, 'i') } })
        .populate('organization')
        .then(result => authenticateUser(result, data))
        .then((result) => {
          const user = { ...result.user.toJSON(), password: undefined };
          res.status(200).send({ ...result, user });
        })
        .catch((err) => {
          res.status(err.status).send(err);
        }),
    )
    .catch((err) => {
      res.status(500).send(err);
    });
});

/**
 * @swagger
 * /api/auth/me:
 *   patch:
 *     tags: [AUTH]
 *     description: Used to confirm user email
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: Confirmation token sent to users email address
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: user was saved as confirmed, the access to internal API has been granted
 */
router.patch('/me', (req, res) => {
  confirmUser(req.body.token)
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((error) => {
      res.status(error.status).send(error.message);
    })
    .catch(() => {
      res.status(500).send({
        message: 'Fail',
      });
    });
});

router.post('/password_reset', async (req, res) => {
  try {
    const data = await validateEmail(req.body);

    const response = await sendPasswordResetEmail(data);

    res.status(200).send(response);
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
});

router.patch('/password_reset/update', (req, res) => {
  validateToken(req.body.token, res)
    .then((result) => {
      checkToken(result.verificationCode)
        ? res.status(200).send(result)
        : res.status(500).send({ message: 'Fail' });
    })
    .catch((error) => {
      res.status(error.status).send(error.message);
    })
    .catch(() => {
      res.status(500).send({
        message: 'Fail',
      });
    });
});

router.post('/password_reset/save', (req, res) => {
  validateToken(req.body.verificationCode, res)
    .then((result) => {
      updatePassword(result._id, req.body);
      res.status(200).send(result);
    })
    .catch((error) => {
      res.status(error.status).send(error.message);
    })
    .catch(() => {
      res.status(500).send({
        message: 'Fail',
      });
    });
});

router.get('/token/extend', extendToken);

module.exports = router;
