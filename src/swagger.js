const swaggerAutogen = require('swagger-autogen')();
const swaggerConfig = require('./config/swagger');

const outputFile = './src/swagger-documention.json';
const endpoints = ['./src/app/routers/users.js'];

swaggerAutogen(outputFile, endpoints, swaggerConfig);
