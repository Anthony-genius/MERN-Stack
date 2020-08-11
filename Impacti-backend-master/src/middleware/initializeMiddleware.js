const { applyHeaders } = require('./applyHeaders');
const { security } = require('./security');

module.exports = {
  applyMiddleware: (app) => {
    app.use('/api/internal', security);
    app.use('/api/auth/update', security);
    app.use('/api/auth/sign-up', security);
    app.use('/api/auth/token/extend', security);
    app.use('/api/internal', applyHeaders('application/json'));
    app.use('/api/external', applyHeaders('application/json'));
  },
};
