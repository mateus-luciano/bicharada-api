"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Attachment = require('../models/Attachment'); var _Attachment2 = _interopRequireDefault(_Attachment);

class AttachmentRepository {
  async getAll() {
    const response = await _Attachment2.default.findAll({
      attributes: ['uid', 'url'],
    });

    return response;
  }

  async find(uid) {
    const response = await _Attachment2.default.findOne({
      attributes: ['uid', 'url'],
      where: { uid },
    });

    return response;
  }

  async save(file, uid) {
    const { originalname, filename } = file;

    const response = await _Attachment2.default.create({
      name: originalname,
      file: filename,
      adoption_uid: uid,
    });

    return response;
  }

  async update(file, uid) {
    const { originalname, filename } = file;

    const response = await _Attachment2.default.update(
      {
        name: originalname,
        file: filename,
        adoption_uid: uid,
      },
      {
        where: { uid },
        returning: ['uid', 'url'],
      }
    );

    return response[1];
  }

  async remove(uid) {
    await _Attachment2.default.destroy({
      where: { uid },
    });
  }
}

exports. default = new AttachmentRepository();
