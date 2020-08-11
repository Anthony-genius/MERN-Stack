const { getConfig } = require('../config/config');

module.exports = {
  confirmationEmail: verificationCode => ({
    subject: 'Confirm your Impacti account',
    html: `
      <p>We received your request to join Impacti CONNECT – a global community of SDG business
        leaders.</p>
      <p>Click <a href="${getConfig('clientBaseUrl')}/hello/${verificationCode}">here</a> to confirm your registration.</p>
      <p>We invite you to enjoy a free 3-month “Early Adopter’s” trial period.</p>
      <p>If you experience issues signing in or you didn’t send this request, please <a href="mailto:discover@impacti.solutions" target="_blank">contact us</a>.</p>
      <p>Thanks!</p>
      <p>The Impacti team</p>`,
  }),
};