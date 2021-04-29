"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _AdoptionController = require('../controllers/AdoptionController'); var _AdoptionController2 = _interopRequireDefault(_AdoptionController);
var _auth = require('../middlewares/auth'); var _auth2 = _interopRequireDefault(_auth);
var _adoption = require('../middlewares/adoption');

const routes = new (0, _express.Router)();

routes.get('/adoptions', _AdoptionController2.default.index);
routes.get('/adoptions/:uid', _adoption.validateAdoptionExists, _AdoptionController2.default.show);
routes.post(
  '/adoptions',
  _auth2.default,
  _adoption.validateData,
  _AdoptionController2.default.store
);
routes.put(
  '/adoptions/:uid',
  _auth2.default,
  _adoption.validateAdoptionExists,
  _AdoptionController2.default.update
);
routes.delete(
  '/adoptions/:uid',
  _auth2.default,
  _adoption.validateAdoptionExists,
  _AdoptionController2.default.delete
);

exports. default = routes;
