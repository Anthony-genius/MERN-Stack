const env = process.env.ENV;

let envVars;

if (env === 'test') {
  const testEnv = require('./config.test');
  envVars = testEnv;
} else if (env === 'dev') {
  const devEnv = require('./config.dev');
  envVars = devEnv;
} else if (env === 'stage') {
  const stageEnv = require('./config.stage');
  envVars = stageEnv;
} else if (env === 'demo') {
  const demoEnv = require('./config.demo');
  envVars = demoEnv;
} else {
  const prodEnv = require('./config.prod');
  envVars = prodEnv;
}

const config = {
  swagger: {
    swaggerDefinition: {
      info: {
        title: 'ImpactI',
        version: '1.0.0',
        description: '',
      },
      host: `localhost:${envVars.port}`,
      basePath: '/',
    },
    apis: ['./src/routes/*'],
  },
  host: envVars.host,
  port: envVars.port,
  connectionString: envVars.connectionString,
  secret: envVars.secret,
  passwordSecret: envVars.passwordSecret,
  mailerUser: envVars.mailerUser,
  mailerPassword: envVars.mailerPassword,
  cors: {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    allowedHeaders: 'authentication, Content-Type',
  },
  clientBaseUrl: envVars.clientBaseUrl,
  tokenExpiresIn: envVars.tokenExpiresIn,
};

module.exports = { getConfig: parameter => (config[parameter] ? config[parameter] : null) };
