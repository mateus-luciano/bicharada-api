import UserRepository from '../repositories/User';
import Cache from '../../lib/Cache';

class UserService {
  async getAll(limit, page) {
    const usersCache = await Cache.get(`users--${page}`);

    if (usersCache !== null) {
      return {
        data: JSON.parse(usersCache),
        cache: true,
      };
    }

    const data = await UserRepository.getAll(limit, page);

    await Cache.setExpire(`users--${page}`, JSON.stringify(data), 3600);

    return {
      data,
      cache: false,
    };
  }

  async find(uid) {
    const userCache = await Cache.get(`user-${uid}`);

    if (userCache !== null) {
      return {
        data: JSON.parse(userCache),
        cache: true,
      };
    }

    const data = await UserRepository.find(uid);

    await Cache.setExpire(`user-${uid}`, JSON.stringify(data), 3600);

    return {
      data,
      cache: false,
    };
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

    await Cache.setExpire(`user-${uid}`, JSON.stringify(data), 3600);

    return {
      data,
      cache: false,
    };
  }

  async remove(uid) {
    await UserRepository.remove(uid);
    await Cache.delete(`user-${uid}`);
  }
}

export default new UserService();
