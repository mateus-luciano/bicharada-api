"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Adoption = require('../models/Adoption'); var _Adoption2 = _interopRequireDefault(_Adoption);

function validateData(req, res, next) {
  const { title, description, address, type } = req.body;

  if (!title || !description || !address || !type) {
    return res.status(400).json({
      message: 'Dados inválidos',
    });
  }

  next();
}

async function validateAdoptionExists(req, res, next) {
  const { uid } = req.params;

  const adoption = await _Adoption2.default.findOne({
    where: { uid },
  });

  if (!adoption) {
    return res.status(404).json({
      message: 'Não encontrado',
    });
  }

  req.adoptionUid = adoption.uid;

  next();
}

exports.validateData = validateData; exports.validateAdoptionExists = validateAdoptionExists;
