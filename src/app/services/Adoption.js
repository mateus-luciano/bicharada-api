import AdoptionRepository from '../repositories/Adoption';
// import Cache from '../utils/Cache';

class AdoptionService {
  async getAll(limit, page) {
    // const cache = await Cache.get(`adoptions-${page}`);

    // if (cache !== null) {
    //   return JSON.parse(cache);
    // }

    const data = await AdoptionRepository.getAll(limit, page);

    // await Cache.set(`adoptions-${page}`, JSON.stringify(data));

    return data;
  }

  async find(uid) {
    const data = await AdoptionRepository.find(uid);

    return data;
  }

  async save(title, description, address, type, region, uid) {
    const data = await AdoptionRepository.save(
      title,
      description,
      address,
      type,
      region,
      uid
    );

    return data;
  }

  async update(title, description, address, type, region, uid) {
    const data = await AdoptionRepository.update(
      title,
      description,
      address,
      type,
      region,
      uid
    );

    return data;
  }

  async remove(uid) {
    await AdoptionRepository.remove(uid);
  }
}

export default new AdoptionService();
