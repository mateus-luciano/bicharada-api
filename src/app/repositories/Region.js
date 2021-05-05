import Region from '../models/Region';

class RegionRepository {
  async getAll() {
    const response = await Region.findAll({
      attributes: ['uid', 'name'],
      order: [['created_at', 'DESC']],
    });

    return response;
  }

  async find(uid) {
    const response = await Region.findOne({
      attributes: ['uid', 'name'],
      where: { uid },
    });

    return response;
  }

  async save(name) {
    const response = await Region.create({
      name,
    });

    return response;
  }

  async update(name, uid) {
    const response = await Region.update(
      {
        name,
      },
      {
        where: { uid },
        attributes: ['uid', 'name'],
      }
    );

    return response[1];
  }

  async remove(uid) {
    await Region.destroy({
      where: { uid },
    });
  }
}

export default new RegionRepository();
