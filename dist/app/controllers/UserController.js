"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } }var _User = require('../services/User'); var _User2 = _interopRequireDefault(_User);

var _http = require('../constants/http'); var _http2 = _interopRequireDefault(_http);

class UserController {
  async index(req, res) {
    const { limit, page } = req.query;

    try {
      const data = await _User2.default.getAll(_nullishCoalesce(limit, () => ( 10)), _nullishCoalesce(page, () => ( 1)));

      return res.json(data);
    } catch (error) {
      return res.status(error.status || _http2.default.BadRequest).json(error);
    }
  }

  async show(req, res) {
    const { uid } = req.params;

    try {
      const data = await _User2.default.find(uid);

      return res.json(data);
    } catch (error) {
      return res.status(error.status || _http2.default.BadRequest).json(error);
    }
  }

  async store(req, res) {
    const { email, password, name, city, phone } = req.body;

    try {
      const data = await _User2.default.save(email, password, name, city, phone);

      return res.status(_http2.default.Created).json(data);
    } catch (error) {
      return res.status(error.status || _http2.default.BadRequest).json(error);
    }
  }

  async update(req, res) {
    const { uid } = req.params;
    const { email, password, name, city, phone } = req.body;

    try {
      const data = await _User2.default.update(
        email,
        password,
        name,
        city,
        phone,
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
      await _User2.default.remove(uid);

      return res.sendStatus(_http2.default.NoContent);
    } catch (error) {
      return res.status(error.status || _http2.default.BadRequest).json(error);
    }
  }
}

exports. default = new UserController();
