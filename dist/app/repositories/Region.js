"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Region = require('../models/Region'); var _Region2 = _interopRequireDefault(_Region);

class RegionRepository {
  async getAll() {
    const response = await _Region2.default.findAll({
      attributes: ['uid', 'name'],
      order: [['created_at', 'DESC']],
    });

    return response;
  }

  async find(uid) {
    const response = await _Region2.default.findOne({
      attributes: ['uid', 'name'],
      where: { uid },
    });

    return response;
  }

  async save(name) {
    const response = await _Region2.default.create({
      name,
    });

    return response;
  }

  async update(name, uid) {
    const response = await _Region2.default.update(
      {
        name,
      },
      {
        where: { uid },
        attributes: ['uid', 'name'],
      }
    );

    return response[1];
  }

  async remove(uid) {
    await _Region2.default.destroy({
      where: { uid },
    });
  }
}

exports. default = new RegionRepository();
