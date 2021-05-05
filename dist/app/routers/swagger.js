"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
// eslint-disable-next-line import/no-extraneous-dependencies
var _swaggeruiexpress = require('swagger-ui-express'); var _swaggeruiexpress2 = _interopRequireDefault(_swaggeruiexpress);
var _swaggerdocumentionjson = require('../../swagger-documention.json'); var _swaggerdocumentionjson2 = _interopRequireDefault(_swaggerdocumentionjson);

const routes = new (0, _express.Router)();

routes.use(
  '/documentation',
  _swaggeruiexpress2.default.serve,
  _swaggeruiexpress2.default.setup(_swaggerdocumentionjson2.default)
);

exports. default = routes;
