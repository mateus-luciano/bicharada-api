"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Adoption = require('../models/Adoption'); var _Adoption2 = _interopRequireDefault(_Adoption);
var _Attachment = require('../models/Attachment'); var _Attachment2 = _interopRequireDefault(_Attachment);

class AdoptionRepository {
  async getAll(limit, page) {
    const response = await _Adoption2.default.findAndCountAll({
      attributes: ['uid', 'title', 'description', 'address', 'type'],
      order: [['created_at', 'DESC']],
      limit,
      offset: limit * (page - 1),
    });

    return {
      current_page: page,
      total_pages: Math.ceil(response.count / limit),
      total: response.count,
      data: response.rows,
    };
  }

  async find(uid) {
    const response = await _Adoption2.default.findOne({
      where: { uid },
      attributes: ['uid', 'title', 'description', 'address', 'type'],
    });

    const attachments = await _Attachment2.default.findAll({
      attributes: ['uid', 'url'],
      where: { adoption_uid: uid },
    });

    return {
      data: response,
      attachments,
    };
  }

  async save(title, description, address, type, uid) {
    const response = await _Adoption2.default.create({
      title,
      description,
      address,
      type,
      user_uid: uid,
    });

    return response;
  }

  async update(title, description, address, type, uid) {
    const response = await _Adoption2.default.update(
      {
        title,
        description,
        address,
        type,
      },
      {
        where: { uid },
        returning: ['uid', 'title', 'description', 'address', 'type'],
      }
    );

    return response[1];
  }

  async remove(uid) {
    await _Attachment2.default.destroy({
      where: { adoption_uid: uid },
    });

    await _Adoption2.default.destroy({
      where: { uid },
    });
  }
}

exports. default = new AdoptionRepository();
