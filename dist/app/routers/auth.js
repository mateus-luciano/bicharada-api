"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _AuthController = require('../controllers/AuthController'); var _AuthController2 = _interopRequireDefault(_AuthController);
var _login = require('../middlewares/login');




var _resetPassword = require('../middlewares/resetPassword');

const routes = new (0, _express.Router)();

routes.post('/login', _login.checkUserExists, _login.checkPassword, _AuthController2.default.login);
routes.post(
  '/forgot-password',
  _resetPassword.validateData,
  _login.checkUserExists,
  _AuthController2.default.forgotPassword
);
routes.post(
  '/reset-password',
  _resetPassword.validateData,
  _resetPassword.validateDataToken,
  _resetPassword.validateToken,
  _AuthController2.default.resetPassword
);

exports. default = routes;
