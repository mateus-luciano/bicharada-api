"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
var _httperrors = require('http-errors'); var _httperrors2 = _interopRequireDefault(_httperrors);

var _auth = require('../../config/auth'); var _auth2 = _interopRequireDefault(_auth);

var _http = require('../constants/http'); var _http2 = _interopRequireDefault(_http);
var _auth3 = require('../constants/auth'); var _auth4 = _interopRequireDefault(_auth3);

exports. default = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw _httperrors2.default.call(void 0, 
      _http2.default.Unauthorized,
      _auth4.default.TokenUnauthorized
    );
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = await _jsonwebtoken2.default.verify(token, _auth2.default.secret);

    req.uid = decoded.uid;

    next();
  } catch (error) {
    throw _httperrors2.default.call(void 0, _http2.default.Unauthorized, _auth4.default.TokenInvalid);
  }
};
