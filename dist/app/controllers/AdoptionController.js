"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } }var _AdoptionRepository = require('../repositories/AdoptionRepository'); var _AdoptionRepository2 = _interopRequireDefault(_AdoptionRepository);

class AdoptionController {
  async index(req, res) {
    const { page, limit } = req.query;

    try {
      const data = await _AdoptionRepository2.default.getAll(_nullishCoalesce(page, () => ( 1)), _nullishCoalesce(limit, () => ( 10)));

      return res.json(data);
    } catch (error) {
      return res.status(error.status || 400).json(error);
    }
  }

  async show(req, res) {
    const { uid } = req.params;

    try {
      const data = await _AdoptionRepository2.default.find(uid);

      return res.json(data);
    } catch (error) {
      return res.status(error.status || 400).json(error);
    }
  }

  async store(req, res) {
    try {
      const data = await _AdoptionRepository2.default.save(req.body, req.uid);

      return res.status(201).json(data);
    } catch (error) {
      return res.status(error.status || 400).json(error);
    }
  }

  async update(req, res) {
    const { uid } = req.params;

    try {
      const data = await _AdoptionRepository2.default.update(req.body, uid);

      return res.json(data);
    } catch (error) {
      return res.status(error.status || 400).json(error);
    }
  }

  async delete(req, res) {
    const { uid } = req.params;

    try {
      await _AdoptionRepository2.default.remove(uid);

      return res.sendStatus(204);
    } catch (error) {
      return res.status(error.status || 400).json(error);
    }
  }
}

exports. default = new AdoptionController();
