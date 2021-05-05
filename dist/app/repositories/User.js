"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);
var _Adoption = require('../models/Adoption'); var _Adoption2 = _interopRequireDefault(_Adoption);

class UserRepository {
  async getAll(limit, page) {
    const response = await _User2.default.findAndCountAll({
      attributes: ['uid', 'email', 'name', 'city', 'phone'],
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
    const response = await _User2.default.findOne({
      where: { uid },
      attributes: ['uid', 'email', 'name', 'city', 'phone'],
    });

    const adoptions = await _Adoption2.default.findAll({
      where: { user_uid: uid },
      attributes: ['uid', 'title', 'description', 'address', 'type'],
    });

    return {
      data: response.data,
      adoptions,
    };
  }

  async save(email, password, name, city, phone) {
    const response = await _User2.default.create({
      email,
      password,
      name,
      city,
      phone,
    });

    return response;
  }

  async update(email, password, name, city, phone, uid) {
    const response = await _User2.default.update(
      {
        email,
        password,
        name,
        city,
        phone,
      },
      {
        where: { uid },
        returning: ['uid', 'email', 'name', 'city', 'phone'],
      }
    );

    return response[1];
  }

  async remove(uid) {
    await _Adoption2.default.destroy({
      where: { user_uid: uid },
    });

    await _User2.default.destroy({
      where: { uid },
    });
  }
}

exports. default = new UserRepository();
