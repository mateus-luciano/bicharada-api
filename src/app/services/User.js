import UserRepository from '../repositories/User';
// import Cache from '../utils/Cache';

class UserService {
  async getAll(limit, page) {
    // const cache = await Cache.get('users');

    // if (cache !== null) {
    //   return JSON.parse(cache);
    // }

    const data = await UserRepository.getAll(limit, page);

    // await Cache.set('users', JSON.stringify(data));

    return data;
  }

  async find(uid) {
    const data = await UserRepository.find(uid);

    return data;
  }

  async save(email, password, name, city, phone) {
    const data = UserRepository.save(email, password, name, city, phone);

    return data;
  }

  async update(email, password, name, city, phone, uid) {
    const data = UserRepository.update(email, password, name, city, phone, uid);

    return data;
  }

  async remove(uid) {
    await UserRepository.remove(uid);
  }
}

export default new UserService();
