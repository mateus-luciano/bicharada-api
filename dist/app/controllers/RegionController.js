"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Region = require('../services/Region'); var _Region2 = _interopRequireDefault(_Region);

var _http = require('../constants/http'); var _http2 = _interopRequireDefault(_http);

class RegionController {
  async index(req, res) {
    try {
      const data = await _Region2.default.getAll();

      return res.json(data);
    } catch (error) {
      return res.status(error.status || _http2.default.BadRequest).json(error);
    }
  }

  async show(req, res) {
    const { uid } = req.params;

    try {
      const data = await _Region2.default.find(uid);

      return res.json(data);
    } catch (error) {
      return res.status(error.status || _http2.default.BadRequest).json(error);
    }
  }

  async store(req, res) {
    const { name } = req.body;

    try {
      const data = await _Region2.default.save(name);

      return res.status(_http2.default.Created).json(data);
    } catch (error) {
      return res.status(error.status || _http2.default.BadRequest).json(error);
    }
  }

  async update(req, res) {
    const { uid } = req.params;
    const { name } = req.body;

    try {
      const data = await _Region2.default.update(name, uid);

      return res.json(data);
    } catch (error) {
      return res.status(error.status || _http2.default.BadRequest).json(error);
    }
  }

  async delete(req, res) {
    const { uid } = req.params;

    try {
      await _Region2.default.remove(uid);

      return res.sendStatus(_http2.default.NoContent);
    } catch (error) {
      return res.status(error.status || _http2.default.BadRequest).json(error);
    }
  }
}

exports. default = new RegionController();
