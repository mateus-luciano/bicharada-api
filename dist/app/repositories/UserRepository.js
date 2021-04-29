"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);
var _Adoption = require('../models/Adoption'); var _Adoption2 = _interopRequireDefault(_Adoption);

class UserRepository {
  async getAll(page, limit) {
    const offset = (page - 1) * limit;

    const response = await _User2.default.findAndCountAll({
      attributes: ['uid', 'email', 'first_name', 'last_name'],
      order: [['created_at', 'DESC']],
      limit,
      offset,
    });

    return {
      current_page: page,
      total_pages: Math.ceil(response.count / limit),
      total: response.count,
      data: response.rows,
    };
  }

  async find(uid) {
    const data = await _User2.default.findOne({
      where: { uid },
      attributes: ['uid', 'email', 'first_name', 'last_name'],
    });

    const adoptions = await _Adoption2.default.findAll({
      where: { user_uid: uid },
      attributes: ['uid', 'title', 'description', 'address', 'type'],
    });

    return {
      data,
      adoptions,
    };
  }

  async save(body) {
    const { email, password, firstName, lastName } = body;

    const response = await _User2.default.create({
      email,
      password,
      first_name: firstName,
      last_name: lastName,
    });

    return response;
  }

  async update(body, uid) {
    const { email, password, firstName, lastName } = body;

    const response = await _User2.default.update(
      {
        email,
        password,
        first_name: firstName,
        last_name: lastName,
      },
      {
        where: { uid },
        returning: ['uid', 'email', 'first_name', 'last_name'],
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
