"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _httperrors = require('http-errors'); var _httperrors2 = _interopRequireDefault(_httperrors);

var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);

var _http = require('../constants/http'); var _http2 = _interopRequireDefault(_http);
var _user = require('../constants/user'); var _user2 = _interopRequireDefault(_user);

function validateData(req, res, next) {
  const { email, password, name, city, phone } = req.body;

  if (!email || !password || !name || !city || !phone) {
    throw _httperrors2.default.call(void 0, _http2.default.BadRequest, _user2.default.InvalidData);
  }

  next();
}

async function checkEmail(req, res, next) {
  const { email } = req.body;

  const user = await _User2.default.findOne({
    where: { email },
  });

  if (user) {
    throw _httperrors2.default.call(void 0, _http2.default.Conflict, _user2.default.InvalidEmail);
  }

  next();
}

async function validateUserExists(req, res, next) {
  const { uid } = req.params;

  const user = await _User2.default.findOne({
    where: { uid },
  });

  if (!user) {
    throw _httperrors2.default.call(void 0, _http2.default.NotFound, _user2.default.UserNotFound);
  }

  next();
}

exports.validateData = validateData; exports.checkEmail = checkEmail; exports.validateUserExists = validateUserExists;
