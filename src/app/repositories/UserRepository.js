import User from '../models/User';
import Adoption from '../models/Adoption';

class UserRepository {
  async getAll(page, limit) {
    const offset = (page - 1) * limit;

    const response = await User.findAndCountAll({
      attributes: ['uid', 'email', 'first_name', 'last_name'],
      order: [['created_at', 'DESC']],
      limit,
      offset,
    });

    return {
      current_page: page,
      total_pages: Math.ceil(response.count / limit),
      total: response.count,
      data: response.rows,
    };
  }

  async find(uid) {
    const data = await User.findOne({
      where: { uid },
      attributes: ['uid', 'email', 'first_name', 'last_name'],
    });

    const adoptions = await Adoption.findOne({
      where: { user_uid: uid },
      attributes: ['uid', 'title', 'description', 'address', 'type'],
    });

    return {
      data,
      adoptions,
    };
  }

  async save(body) {
    const { email, password, firstName, lastName } = body;

    const response = await User.create({
      email,
      password,
      first_name: firstName,
      last_name: lastName,
    });

    return response;
  }

  async update(body, uid) {
    const { email, password, firstName, lastName } = body;

    const response = await User.update(
      {
        email,
        password,
        first_name: firstName,
        last_name: lastName,
      },
      {
        where: { uid },
        returning: ['uid', 'email', 'first_name', 'last_name'],
      }
    );

    return response[1];
  }

  async remove(uid) {
    await Adoption.destroy({
      where: { user_uid: uid },
    });
    await User.destroy({
      where: { uid },
    });
  }
}

export default new UserRepository();
