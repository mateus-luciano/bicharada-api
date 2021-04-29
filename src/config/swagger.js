require('dotenv').config();

const host = process.env.API_URL;

const customer = require('../app/documentation/customer');

module.exports = {
  info: {
    version: '1.0.0',
    title: 'Doc minha API',
    description: 'Minha descrição',
  },
  host,
  basePath: '/',
  schemes: ['http'],
  consumes: ['application/json'],
  produces: ['application/json'],
  defaultModelsExpandDepth: -1,
  securityDefinitions: {
    Bearer: {
      description: 'JWT Token',
      type: 'apiKey',
      in: 'header',
      name: 'Authorization',
    },
  },
  definitions: { customer },
};
