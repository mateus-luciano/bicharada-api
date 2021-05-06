"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _User = require('../repositories/User'); var _User2 = _interopRequireDefault(_User);
// import Cache from '../utils/Cache';

class UserService {
  async getAll(limit, page) {
    // const cache = await Cache.get('users');

    // if (cache !== null) {
    //   return JSON.parse(cache);
    // }

    const data = await _User2.default.getAll(limit, page);

    // await Cache.set('users', JSON.stringify(data));

    return data;
  }

  async find(uid) {
    const data = await _User2.default.find(uid);

    return data;
  }

  async save(email, password, name, city, phone, region) {
    const data = _User2.default.save(
      email,
      password,
      name,
      city,
      phone,
      region
    );

    return data;
  }

  async update(email, password, name, city, phone, region, uid) {
    const data = _User2.default.update(
      email,
      password,
      name,
      city,
      phone,
      region,
      uid
    );

    return data;
  }

  async remove(uid) {
    await _User2.default.remove(uid);
  }
}

exports. default = new UserService();
