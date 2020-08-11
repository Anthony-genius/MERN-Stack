/* eslint-disable no-new */
/* eslint-disable no-underscore-dangle */
import cron from 'node-cron';

const path = require('path');

const { User } = require('../models/User');
const { getConfig } = require('../config/config');
const { sendEmail } = require('../helpers/mailer');

module.exports = {
  mailCron: () => {
    cron.schedule('0 0 9 * * 1-5', () => {
      new Promise(async (resolve, reject) => {
        try {
          const allUsers = await User.find({
            email: { $exists: true },
            emailConfirmed: { $exists: false },
          });

          const now = new Date();

          const daysBetween = (date1, date2) => {
            const d1 = new Date(date1);
            const d2 = new Date(date2);
            return (d2 - d1) / (1000 * 3600 * 24);
          };

          if (allUsers.length !== 0) {
            allUsers.map(data =>
              daysBetween(data._id.getTimestamp(), now) >= 7 &&
              data.emailConfirmed !== true &&
              data.reminderSent !== true &&
                (User.findByIdAndUpdate(
                  data._id,
                  { reminderSent: true },
                ).then((user) => {
                  sendEmail.send({
                    template: 'confirmReminder',
                    message: {
                      from: getConfig('mailerUser'),
                      to: user.email,
                    },
                    locals: {
                      clientBaseUrl: getConfig('clientBaseUrl'),
                      verificationCode: user.verificationCode,
                      url: path.join(getConfig('clientBaseUrl'), 'hello', user.verificationCode),
                    },
                  });
                })
                ),
            );
          }
          resolve();
        } catch (e) {
          reject(e);
        }
      });
    });
  },
};
