import AdoptionRepository from '../repositories/Adoption';
import Cache from '../../lib/Cache';

class AdoptionService {
  async getAll(limit, page) {
    const adoptionsCache = await Cache.get(`adoptions-${page}`);

    if (adoptionsCache !== null) {
      return {
        data: JSON.parse(adoptionsCache),
        cache: true,
      };
    }

    const data = await AdoptionRepository.getAll(limit, page);

    await Cache.setExpire(`adoptions-${page}`, JSON.stringify(data), 3600);

    return {
      data,
      cache: false,
    };
  }

  async find(uid) {
    const adoptionCache = await Cache.get(`adoption-${uid}`);

    if (adoptionCache !== null) {
      return {
        data: JSON.parse(adoptionCache),
        cache: true,
      };
    }

    const data = await AdoptionRepository.find(uid);

    await Cache.setExpire(`adoption-${uid}`, JSON.stringify(data), 3600);

    return {
      data,
      cache: false,
    };
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

    await Cache.setExpire(`adoption-${uid}`, JSON.stringify(data), 3600);

    return {
      data,
      cache: false,
    };
  }

  async remove(uid) {
    await AdoptionRepository.remove(uid);
    await Cache.delete(`adoption-${uid}`);
  }
}

export default new AdoptionService();
