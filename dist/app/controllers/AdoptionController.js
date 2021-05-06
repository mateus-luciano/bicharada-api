"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } }var _Adoption = require('../services/Adoption'); var _Adoption2 = _interopRequireDefault(_Adoption);

var _http = require('../constants/http'); var _http2 = _interopRequireDefault(_http);

class AdoptionController {
  async index(req, res) {
    const { limit, page } = req.query;

    try {
      const data = await _Adoption2.default.getAll(_nullishCoalesce(limit, () => ( 10)), _nullishCoalesce(page, () => ( 1)));

      return res.json(data);
    } catch (error) {
      return res.status(error.status || _http2.default.BadRequest).json(error);
    }
  }

  async show(req, res) {
    const { uid } = req.params;

    try {
      const data = await _Adoption2.default.find(uid);

      return res.json(data);
    } catch (error) {
      return res.status(error.status || _http2.default.BadRequest).json(error);
    }
  }

  async store(req, res) {
    const { title, description, address, type, region } = req.body;

    try {
      const data = await _Adoption2.default.save(
        title,
        description,
        address,
        type,
        region,
        req.uid
      );

      return res.status(_http2.default.Created).json(data);
    } catch (error) {
      return res.status(error.status || _http2.default.BadRequest).json(error);
    }
  }

  async update(req, res) {
    const { uid } = req.params;
    const { title, description, address, type, region } = req.body;

    try {
      const data = await _Adoption2.default.update(
        title,
        description,
        address,
        type,
        region,
        uid
      );

      return res.json(data);
    } catch (error) {
      return res.status(error.status || _http2.default.BadRequest).json(error);
    }
  }

  async delete(req, res) {
    const { uid } = req.params;

    try {
      await _Adoption2.default.remove(uid);

      return res.sendStatus(_http2.default.NoContent);
    } catch (error) {
      return res.status(error.status || _http2.default.BadRequest).json(error);
    }
  }
}

exports. default = new AdoptionController();
