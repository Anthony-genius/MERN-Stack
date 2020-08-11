const nodemailer = require('nodemailer');
const { getConfig } = require('../config/config');
const Email = require('email-templates');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: getConfig('mailerHost'),
  port: getConfig('mailerPort'),
  auth: {
    user: getConfig('mailerUser'),
    pass: getConfig('mailerPassword'),
  },
});

const sendEmail = new Email({
  transport: transporter,
  send: true,
  preview: false,
});

const getPasswordResetURL = (user, token) =>
  // eslint-disable-next-line no-underscore-dangle
  getConfig('clientBaseUrl')`/password_reset/${user._id}/${token}`;


module.exports = { sendEmail, getPasswordResetURL };
