"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _httperrors = require('http-errors'); var _httperrors2 = _interopRequireDefault(_httperrors);

var _Adoption = require('../models/Adoption'); var _Adoption2 = _interopRequireDefault(_Adoption);

var _http = require('../constants/http'); var _http2 = _interopRequireDefault(_http);
var _messagesError = require('../constants/messagesError'); var _messagesError2 = _interopRequireDefault(_messagesError);

function validateData(req, res, next) {
  const { title, description, address, type } = req.body;

  if (!title || !description || !address || !type) {
    throw _httperrors2.default.call(void 0, _http2.default.BadRequest, _messagesError2.default.InvalidParams);
  }

  next();
}

async function validateAdoptionExists(req, res, next) {
  const { uid } = req.params;

  const adoption = await _Adoption2.default.findOne({
    where: { uid },
  });

  if (!adoption) {
    throw _httperrors2.default.call(void 0, _http2.default.NoContent, _messagesError2.default.NotFound);
  }

  req.adoptionUid = adoption.uid;

  next();
}

exports.validateData = validateData; exports.validateAdoptionExists = validateAdoptionExists;
