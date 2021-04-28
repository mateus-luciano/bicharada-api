import User from '../models/User';

class UserRepository {
  async getAll(page, limit) {
    const offset = (page - 1) * limit;

    const response = await User.findAndCountAll({
      attributes: ['uuid', 'email', 'first_name', 'last_name'],
      order: [['uuid', 'DESC']],
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
}

export default new UserRepository();
