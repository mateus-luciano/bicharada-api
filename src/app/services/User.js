import UserRepository from '../repositories/User';
import Cache from '../utils/Cache';

class UserService {
  async getAll(limit, page) {
    const cache = await Cache.get(`users-${page}`);

    if (cache !== null) {
      return JSON.parse(cache);
    }

    const data = await UserRepository.getAll(limit, page);

    await Cache.set(`users-${page}`, JSON.stringify(data));

    return data;
  }

  async find(uid) {
    const data = await UserRepository.find(uid);

    return data;
  }

  async save(email, password, name, city, phone, region) {
    const data = UserRepository.save(
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
    const data = UserRepository.update(
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
    await UserRepository.remove(uid);
  }
}

export default new UserService();
