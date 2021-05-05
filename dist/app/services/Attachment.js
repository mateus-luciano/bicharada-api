"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Attachment = require('../repositories/Attachment'); var _Attachment2 = _interopRequireDefault(_Attachment);

class AttachmentService {
  async getAll() {
    // const cache = await Cache.get('attachments');

    // if (cache !== null) {
    //   return JSON.parse(cache);
    // }

    const data = await _Attachment2.default.getAll();

    // await Cache.set('adoptions', JSON.stringify(data));

    return data;
  }

  async find(uid) {
    const data = await _Attachment2.default.find(uid);

    return data;
  }

  async save(originalname, filename, uid) {
    const data = await _Attachment2.default.save(originalname, filename, uid);

    return data;
  }

  async update(originalname, filename, uid) {
    const data = _Attachment2.default.update(originalname, filename, uid);

    return data;
  }

  async remove(uid) {
    await _Attachment2.default.remove(uid);
  }
}

exports. default = new AttachmentService();
