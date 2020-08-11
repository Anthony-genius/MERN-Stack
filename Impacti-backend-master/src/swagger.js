import swaggerJsDoc from 'swagger-jsdoc';
import swaggerTools from 'swagger-tools';

const { getConfig } = require('./config/config');

const swaggerSpec = swaggerJsDoc(getConfig('swagger'));

module.exports = { initializeSwagger: (app) => {
  app.get('/api/swagger.json', (req, res) => {
    res.send(swaggerSpec);
  });

  swaggerTools.initializeMiddleware(swaggerSpec, (middleware) => {
    app.use(middleware.swaggerMetadata());
    app.use('/api', middleware.swaggerUi());
  });
} };
