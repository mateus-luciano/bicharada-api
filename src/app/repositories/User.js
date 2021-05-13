import User from '../models/User';
import Adoption from '../models/Adoption';
import Attachment from '../models/Attachment';

class UserRepository {
  async getAll(limit, page) {
    const response = await User.findAndCountAll({
      attributes: ['uid', 'email', 'name', 'city', 'phone', 'admin'],
      order: [['created_at', 'DESC']],
      limit,
      offset: limit * (page - 1),
    });

    return {
      current_page: page,
      total_pages: Math.ceil(response.count / limit),
      total: response.count,
      data: response.rows,
    };
  }

  async find(uid) {
    const response = await User.findOne({
      where: { uid },
      attributes: ['uid', 'email', 'name', 'city', 'phone', 'admin'],
    });

    const adoptions = await Adoption.findAll({
      where: { user_uid: uid },
      attributes: ['uid', 'title', 'description', 'address', 'type'],
      include: [
        {
          model: Attachment,
          as: 'attachments',
          attributes: ['uid', 'url'],
          order: [['created_at', 'DESC']],
        },
      ],
    });

    return {
      data: response,
      adoptions,
    };
  }

  async save(email, password, name, city, phone, region) {
    const response = await User.create({
      email,
      password,
      name,
      city,
      phone,
      region_uid: region,
    });

    return response;
  }

  async update(email, password, name, city, phone, region, uid) {
    const response = await User.update(
      {
        email,
        password,
        name,
        city,
        phone,
        region_uid: region,
      },
      {
        where: { uid },
        returning: ['uid', 'email', 'name', 'city', 'phone'],
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
