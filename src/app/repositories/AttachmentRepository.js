import Attachment from '../models/Attachment';

class AttachmentRepository {
  async getAll(uid) {
    const response = await Attachment.findAll({
      attributes: ['uid', 'url'],
      where: { adoption_uid: uid },
    });

    return response;
  }

  async find(attachmentUid) {
    const response = await Attachment.findOne({
      attributes: ['uid', 'url'],
      where: { uid: attachmentUid },
    });

    return response;
  }

  async save(file, uid) {
    const { originalname, filename } = file;

    const response = await Attachment.create({
      name: originalname,
      file: filename,
      adoption_uid: uid,
    });

    return response;
  }

  async update(file, uid, attachmentUid) {
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
