"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _httperrors = require('http-errors'); var _httperrors2 = _interopRequireDefault(_httperrors);

var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);

var _http = require('../constants/http'); var _http2 = _interopRequireDefault(_http);
var _resetPassword = require('../constants/resetPassword'); var _resetPassword2 = _interopRequireDefault(_resetPassword);

function validateData(req, res, next) {
  const { email } = req.body;

  if (!email) {
    throw _httperrors2.default.call(void 0, 
      _http2.default.BadRequest,
      _resetPassword2.default.InvalidEmail
    );
  }

  next();
}

function validateDataToken(req, res, next) {
  const { email, password, token } = req.body;

  if (!email || !password || !token) {
    throw _httperrors2.default.call(void 0, 
      _http2.default.BadRequest,
      _resetPassword2.default.InvalidData
    );
  }

  next();
}

async function validateToken(req, res, next) {
  const { email, token } = req.body;

  const now = new Date();

  const user = await _User2.default.findOne({
    where: { email },
  });

  if (token !== user.password_reset_token) {
    throw _httperrors2.default.call(void 0, 
      _http2.default.Unauthorized,
      _resetPassword2.default.InvalidToken
    );
  }

  if (now > user.password_reset_expires) {
    throw _httperrors2.default.call(void 0, 
      _http2.default.Unauthorized,
      _resetPassword2.default.ExpiredToken
    );
  }

  next();
}
exports.validateData = validateData; exports.validateDataToken = validateDataToken; exports.validateToken = validateToken;
