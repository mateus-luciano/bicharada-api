"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);

async function checkUserExists(req, res, next) {
  const { email } = req.body;

  const user = await _User2.default.findOne({
    where: { email },
  });

  if (!user) {
    return res.status(400).json({
      message: 'E-mail inválido',
    });
  }

  next();
}

async function checkPassword(req, res, next) {
  const { email, password } = req.body;

  const user = await _User2.default.findOne({
    where: { email },
  });

  if (!(await user.checkPassword(password))) {
    return res.status(401).json({
      message: 'Senha não confere',
    });
  }

  next();
}

exports.checkUserExists = checkUserExists; exports.checkPassword = checkPassword;
