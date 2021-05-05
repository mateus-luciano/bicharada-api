import Attachment from '../models/Attachment';

class AttachmentRepository {
  async getAll() {
    const response = await Attachment.findAll({
      attributes: ['uid', 'url'],
    });

    return response;
  }

  async find(uid) {
    const response = await Attachment.findOne({
      attributes: ['uid', 'url'],
      where: { uid },
    });

    return response;
  }

  async save(originalname, filename, uid) {
    const response = await Attachment.create({
      name: originalname,
      file: filename,
      adoption_uid: uid,
    });

    return response;
  }

  async update(originalname, filename, uid) {
    const response = await Attachment.update(
      {
        name: originalname,
        file: filename,
        adoption_uid: uid,
      },
      {
        where: { uid },
        returning: ['uid', 'url'],
      }
    );

    return response[1];
  }

  async remove(uid) {
    await Attachment.destroy({
      where: { uid },
    });
  }
}

export default new AttachmentRepository();
