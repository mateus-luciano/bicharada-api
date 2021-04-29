"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express'); var _express2 = _interopRequireDefault(_express);
var _cors = require('cors'); var _cors2 = _interopRequireDefault(_cors);
var _dotenv = require('dotenv'); var _dotenv2 = _interopRequireDefault(_dotenv);
var _path = require('path'); var _path2 = _interopRequireDefault(_path);
var _routers = require('./app/routers'); var _routers2 = _interopRequireDefault(_routers);
var _middlewares = require('./app/middlewares'); var _middlewares2 = _interopRequireDefault(_middlewares);
require('./database');

class App {
  constructor() {
    this.server = _express2.default.call(void 0, );
    this.configs();
    this.middlewares();
    this.routers();
  }

  configs() {
    this.server.use(_express2.default.json());
    this.server.use(_express2.default.urlencoded({ extended: false }));
    this.server.use(_cors2.default.call(void 0, ));
    this.server.use(
      '/attachments',
      _express2.default.static(_path2.default.resolve(__dirname, 'tmp', 'uploads'))
    );
    _dotenv2.default.config({
      path: process.env.NODE_ENV === 'test' ? './../.env.test' : './../.env',
    });
  }

  middlewares() {
    this.server.use(_middlewares2.default);
  }

  routers() {
    this.server.use(_routers2.default);
  }
}

exports. default = new App().server;
