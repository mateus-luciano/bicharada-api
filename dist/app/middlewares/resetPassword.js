"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);

function validateData(req, res, next) {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({
      message: 'E-mail não oferecido',
    });
  }

  next();
}

function validateDataToken(req, res, next) {
  const { email, password, token } = req.body;

  if (!email || !password || !token) {
    return res.status(400).json({
      message: 'Dados inválidos',
    });
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
    return res.status(401).json({ error: 'Token inválido' });
  }

  if (now > user.password_reset_expires) {
    return res.status(400).json({ error: 'Token expirou, gere um novo' });
  }

  next();
}
exports.validateData = validateData; exports.validateDataToken = validateDataToken; exports.validateToken = validateToken;
