import { Op } from 'sequelize';
import Adoption from '../models/Adoption';
import Attachment from '../models/Attachment';

class AdoptionRepository {
  async getAll(limit, page, filter) {
    let condition = {};
    if (filter === 'all') {
      condition = {
        status: true,
      };
    } else {
      condition = {
        status: true,
        [Op.and]: [{ type: filter }],
      };
    }
    const response = await Adoption.findAndCountAll({
      attributes: [
        'uid',
        'title',
        'description',
        'address',
        'type',
        'status',
        'user_uid',
      ],
      include: [
        {
          model: Attachment,
          as: 'attachments',
          attributes: ['uid', 'url'],
          order: [['created_at', 'DESC']],
        },
      ],
      // where: {
      //   status: true,
      //   [Op.and]: [{ type: 'Gato' }, { type: 'Cachorro' }],
      // },
      where: condition,
      limit,
      offset: limit * (page - 1),
    });
    // provisório
    const countAdoptions = await Adoption.findAndCountAll({
      attributes: ['uid'],
      where: condition,
      limit,
      offset: limit * (page - 1),
    });

    return {
      current_page: page,
      total_pages: Math.ceil(countAdoptions.count / limit),
      total: countAdoptions.count,
      data: response.rows,
    };
  }

  async find(uid) {
    const response = await Adoption.findOne({
      where: { uid },
      attributes: [
        'uid',
        'title',
        'description',
        'address',
        'type',
        'status',
        'user_uid',
      ],
    });

    const attachments = await Attachment.findAll({
      attributes: ['uid', 'url'],
      where: { adoption_uid: uid },
    });

    return {
      data: response,
      attachments,
    };
  }

  async save(title, description, address, type, region, uid) {
    const response = await Adoption.create({
      title,
      description,
      address,
      type,
      user_uid: uid,
      region_uid: region,
    });

    return response;
  }

  async update(title, description, address, type, region, uid) {
    const response = await Adoption.update(
      {
        title,
        description,
        address,
        type,
        region_uid: region,
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
