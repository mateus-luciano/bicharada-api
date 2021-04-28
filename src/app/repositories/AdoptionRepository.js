import Adoption from '../models/Adoption';

class AdoptionRepository {
  async getAll(page, limit) {
    const offset = (page - 1) * limit;

    const response = await Adoption.findAndCountAll({
      attributes: ['uid', 'title', 'description', 'address', 'type'],
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
    const response = await Adoption.findOne({
      where: { uid },
      attributes: ['uid', 'title', 'description', 'address', 'type'],
    });

    return response;
  }

  async save(body, uid) {
    const { title, description, address, type } = body;

    const response = await Adoption.create({
      title,
      description,
      address,
      type,
      user_uid: uid,
    });

    return response;
  }

  async update(body, uid) {
    const { title, description, address, type } = body;

    const response = await Adoption.update(
      {
        title,
        description,
        address,
        type,
      },
      {
        where: { uid },
        returning: ['uid', 'title', 'description', 'address', 'type'],
      }
    );

    return response[1];
  }

  async remove(uid) {
    await Adoption.destroy({
      where: { uid },
    });
  }
}

export default new AdoptionRepository();