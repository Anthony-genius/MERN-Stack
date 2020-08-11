const { getConfig } = require('../config/config');

module.exports = {
  reminderEmail: verificationCode => ({
    subject: 'Complete your Impacti Explore assessment',
    html: `<h1>Thank you for signing up to Impacti!</h1>
    <p>Just a few more steps to complete your profile.</p>
    <a href="${getConfig('clientBaseUrl')}/hello/${verificationCode}"><button>Start impacting now!</button></a>
    `,
  }),
};
