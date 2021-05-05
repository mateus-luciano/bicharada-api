import RegionRepository from '../repositories/Region';

class RegionService {
  async getAll() {
    const data = await RegionRepository.getAll();

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
