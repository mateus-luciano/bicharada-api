"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _RegionController = require('../controllers/RegionController'); var _RegionController2 = _interopRequireDefault(_RegionController);

const routes = new (0, _express.Router)();

routes.get('/regions', _RegionController2.default.index);
routes.get('/regions/:uid', _RegionController2.default.show);
routes.post('/regions', _RegionController2.default.store);
routes.put('/regions/:uid', _RegionController2.default.update);
routes.delete('/regions/:uid', _RegionController2.default.delete);

exports. default = routes;
