"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Attachment = require('../services/Attachment'); var _Attachment2 = _interopRequireDefault(_Attachment);

var _http = require('../constants/http'); var _http2 = _interopRequireDefault(_http);

class AttachmentController {
  async index(req, res) {
    try {
      const data = await _Attachment2.default.getAll();

      return res.json(data);
    } catch (error) {
      return res.status(error.status || _http2.default.BadRequest).json(error);
    }
  }

  async show(req, res) {
    const { uid } = req.params;

    try {
      const data = await _Attachment2.default.find(uid);

      return res.json(data);
    } catch (error) {
      return res.status(error.status || _http2.default.BadRequest).json(error);
    }
  }

  async store(req, res) {
    const { uid } = req.query;
    const { originalname, filename } = req.file;

    try {
      const data = await _Attachment2.default.save(originalname, filename, uid);

      return res.status(_http2.default.Created).json(data);
    } catch (error) {
      return res.status(error.status || _http2.default.BadRequest).json(error);
    }
  }

  async update(req, res) {
    const { uid } = req.params;
    const { originalname, filename } = req.file;

    try {
      const data = await _Attachment2.default.update(originalname, filename, uid);

      return res.json(data);
    } catch (error) {
      return res.status(error.status || _http2.default.BadRequest).json(error);
    }
  }

  async delete(req, res) {
    const { uid } = req.params;
    
    try {
      await _Attachment2.default.remove(uid);

      return res.sendStatus(_http2.default.NoContent);
    } catch (error) {
      return res.status(error.status || _http2.default.BadRequest).json(error);
    }
  }
}

exports. default = new AttachmentController();
