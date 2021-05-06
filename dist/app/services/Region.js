"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Region = require('../repositories/Region'); var _Region2 = _interopRequireDefault(_Region);

class RegionService {
  async getAll() {
    const data = await _Region2.default.getAll();

    return data;
  }

  async find(uid) {
    const data = await _Region2.default.find(uid);

    return data;
  }

  async save(name) {
    const data = await _Region2.default.save(name);

    return data;
  }

  async update(name, uid) {
    const data = await _Region2.default.update(name, uid);

    return data;
  }

  async remove(uid) {
    await _Region2.default.remove(uid);
  }
}

exports. default = new RegionService();
