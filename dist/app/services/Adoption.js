"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Adoption = require('../repositories/Adoption'); var _Adoption2 = _interopRequireDefault(_Adoption);

class AdoptionService {
  async getAll(limit, page) {
    // const cache = await Cache.get('adoptions');

    // if (cache !== null) {
    //   return JSON.parse(cache);
    // }

    const data = await _Adoption2.default.getAll(limit, page);

    // await Cache.set('adoptions', JSON.stringify(data));

    return data;
  }

  async find(uid) {
    const data = await _Adoption2.default.find(uid);

    return data;
  }

  async save(title, description, address, type, uid) {
    const data = await _Adoption2.default.save(
      title,
      description,
      address,
      type,
      uid
    );

    return data;
  }

  async update(title, description, address, type, uid) {
    const data = await _Adoption2.default.update(
      title,
      description,
      address,
      type,
      uid
    );

    return data;
  }

  async remove(uid) {
    await _Adoption2.default.remove(uid);
  }
}

exports. default = new AdoptionService();
