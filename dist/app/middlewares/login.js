"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _httperrors = require('http-errors'); var _httperrors2 = _interopRequireDefault(_httperrors);

var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);

var _http = require('../constants/http'); var _http2 = _interopRequireDefault(_http);
var _login = require('../constants/login'); var _login2 = _interopRequireDefault(_login);

async function checkUserExists(req, res, next) {
  const { email } = req.body;

  const user = await _User2.default.findOne({
    where: { email },
  });

  if (!user) {
    throw _httperrors2.default.call(void 0, _http2.default.BadRequest, _login2.default.InvalidEmail);
  }

  next();
}

async function checkPassword(req, res, next) {
  const { email, password } = req.body;

  const user = await _User2.default.findOne({
    where: { email },
  });

  if (!(await user.checkPassword(password))) {
    throw _httperrors2.default.call(void 0, 
      _http2.default.Unauthorized,
      _login2.default.InvalidPassword
    );
  }

  next();
}

exports.checkUserExists = checkUserExists; exports.checkPassword = checkPassword;
