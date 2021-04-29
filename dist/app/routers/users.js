"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _UserController = require('../controllers/UserController'); var _UserController2 = _interopRequireDefault(_UserController);
var _auth = require('../middlewares/auth'); var _auth2 = _interopRequireDefault(_auth);




var _user = require('../middlewares/user');

const routes = new (0, _express.Router)();

routes.get('/users', _auth2.default, _UserController2.default.index);
routes.get(
  '/users/:uid',
  _auth2.default,
  _user.validateUserExists,
  _UserController2.default.show
);
routes.post('/users', _user.checkEmail, _user.validateData, _UserController2.default.store);
routes.put(
  '/users/:uid',
  _auth2.default,
  _user.validateUserExists,
  _user.validateData,
  _UserController2.default.update
);
routes.delete(
  '/users/:uid',
  _auth2.default,
  _user.validateUserExists,
  _UserController2.default.delete
);

exports. default = routes;
