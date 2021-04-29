"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _nodemailer = require('nodemailer'); var _nodemailer2 = _interopRequireDefault(_nodemailer);
var _nodemailerexpresshandlebars = require('nodemailer-express-handlebars'); var _nodemailerexpresshandlebars2 = _interopRequireDefault(_nodemailerexpresshandlebars);
var _path = require('path'); var _path2 = _interopRequireDefault(_path);

const transport = _nodemailer2.default.createTransport({
  host: process.env.MAILER_HOST,
  port: process.env.MAILER_PORT,
  auth: {
    user: process.env.MAILER_USER,
    pass: process.env.MAILER_PASS,
  },
});

transport.use(
  'compile',
  _nodemailerexpresshandlebars2.default.call(void 0, {
    viewEngine: 'handlebars',
    viewPath: _path2.default.resolve('../../src/resources/mail'),
    extName: '.html',
  })
);

exports. default = transport;
