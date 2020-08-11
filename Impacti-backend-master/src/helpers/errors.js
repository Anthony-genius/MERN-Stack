module.exports = {
  invalidCredentials: { status: 401, message: 'Invalid credentials' },
  notFound: { status: 404, message: 'Not Found' },
  missingParameters: {
    status: 400,
    message: 'Some parameters are missing or invalid',
  },
  tokenFailed: {
    status: 401,
    message: 'Failed to authenticate token.',
    badToken: true,
  },
  tokenInvalid: {
    status: 401,
    message: 'Token is invalid',
    badToken: true,
  },
  sessionTimeout: {
    status: 401,
    message: "You've been logged out due to inactivity",
    badToken: true,
  },
  userNotConfirmed: {
    status: 401,
    message: 'User has not confirmed his email',
    badToken: true,
  },
  valueNotSupported: { status: 400, message: 'Value not supported' },
  wrongParamType: { status: 400, message: 'Parameter is not an ObjectId' },
  databaseFail: { status: 500, message: 'Database error' },
};
