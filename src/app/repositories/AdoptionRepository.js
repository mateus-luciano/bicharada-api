import Adoption from '../models/Adoption';
import Attachment from '../models/Attachment';

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
    const data = await Adoption.findOne({
      where: { uid },
      attributes: ['uid', 'title', 'description', 'address', 'type'],
    });

    const attachments = await Attachment.findAll({
      attributes: ['uid', 'url'],
      where: { adoption_uid: uid },
    });

    return {
      data,
      attachments,
    };
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
    await Attachment.destroy({
      where: { adoption_uid: uid },
    });

    await Adoption.destroy({
      where: { uid },
    });
  }
}

export default new AdoptionRepository();
