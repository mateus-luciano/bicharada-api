"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
var _auth = require('../../config/auth'); var _auth2 = _interopRequireDefault(_auth);

exports. default = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      message: 'Token não autorizado',
    });
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = await _jsonwebtoken2.default.verify(token, _auth2.default.secret);

    req.uid = decoded.uid;

    next();
  } catch (error) {
    return res.status(401).json({
      message: 'Token inválido',
    });
  }
};
