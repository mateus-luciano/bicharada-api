import Attachment from '../models/Attachment';

class AttachmentRepository {
  async getAll(uid) {
    const response = await Attachment.findAll({
      attributes: ['uid', 'url'],
      where: { adoption_uid: uid },
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

  async save(uid, file) {
    const { originalname, filename } = file;

    const response = await Attachment.create({
      name: originalname,
      file: filename,
      adoption_uid: uid,
    });

    return response;
  }

  async update(attachmentUid, uid, file) {
    const { originalname, filename } = file;

    const response = await Attachment.update(
      {
        name: originalname,
        file: filename,
        adoption_uid: uid,
      },
      {
        where: { uid: attachmentUid },
        returning: ['uid', 'url'],
      }
    );

    return response[1];
  }

  async remove(attachmentUid) {
    await Attachment.destroy({
      where: { uid: attachmentUid },
    });
  }
}

export default new AttachmentRepository();
