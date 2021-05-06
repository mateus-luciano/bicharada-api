import RegionRepository from '../repositories/Region';
import Cache from '../utils/Cache';

class RegionService {
  async getAll() {
    const cache = await Cache.get('regions');

    if (cache !== null) {
      return JSON.parse(cache);
    }

    const data = await RegionRepository.getAll();

    await Cache.set('regions', JSON.stringify(data));

    return data;
  }

  async find(uid) {
    const data = await RegionRepository.find(uid);

    return data;
  }

  async save(name) {
    const data = await RegionRepository.save(name);

    return data;
  }

  async update(name, uid) {
    const data = await RegionRepository.update(name, uid);

    return data;
  }

  async remove(uid) {
    await RegionRepository.remove(uid);
  }
}

export default new RegionService();
