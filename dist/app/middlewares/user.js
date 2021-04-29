"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);

function validateData(req, res, next) {
  const { email, password, firstName, lastName } = req.body;

  if (!email || !password || !firstName || !lastName) {
    return res.status(400).json({
      message: 'Dados inválidos',
    });
  }

  next();
}

async function checkEmail(req, res, next) {
  const { email } = req.body;

  const user = await _User2.default.findOne({
    where: { email },
  });

  if (user) {
    return res.status(409).json({
      message: 'E-mail já registrado.',
    });
  }

  next();
}

async function validateUserExists(req, res, next) {
  const { uid } = req.params;

  const user = await _User2.default.findOne({
    where: { uid },
  });

  if (!user) {
    return res.status(404).json({
      message: 'Não encontrado',
    });
  }

  next();
}

exports.validateData = validateData; exports.checkEmail = checkEmail; exports.validateUserExists = validateUserExists;
