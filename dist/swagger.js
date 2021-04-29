"use strict";const swaggerAutogen = require('swagger-autogen')();
const swaggerConfig = require('./config/swagger');

const outputFile = './src/swagger-documention.json';
const endpoints = [];

swaggerAutogen(outputFile, endpoints, swaggerConfig);
