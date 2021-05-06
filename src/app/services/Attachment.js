import AttachmentRepository from '../repositories/Attachment';
import Cache from '../utils/Cache';

class AttachmentService {
  async getAll() {
    const cache = await Cache.get('attachments');

    if (cache !== null) {
      return JSON.parse(cache);
    }

    const data = await AttachmentRepository.getAll();

    await Cache.set('adoptions', JSON.stringify(data));

    return data;
  }

  async find(uid) {
    const data = await AttachmentRepository.find(uid);

    return data;
  }

  async save(originalname, filename, uid) {
    const data = await AttachmentRepository.save(originalname, filename, uid);

    return data;
  }

  async update(originalname, filename, uid) {
    const data = AttachmentRepository.update(originalname, filename, uid);

    return data;
  }

  async remove(uid) {
    await AttachmentRepository.remove(uid);
  }
}

export default new AttachmentService();
