import AttachmentRepository from '../repositories/AttachmentRepository';

class AttachmentController {
  async index(req, res) {
    try {
      const data = await AttachmentRepository.getAll();

      return res.json(data);
    } catch (error) {
      return res.status(error.status || 400).json(error);
    }
  }

  async show(req, res) {
    const { uid } = req.params;

    try {
      const data = await AttachmentRepository.find(uid);

      return res.json(data);
    } catch (error) {
      return res.status(error.status || 400).json(error);
    }
  }

  async store(req, res) {
    const { uid } = req.query;

    try {
      const data = await AttachmentRepository.save(req.file, uid);

      return res.status(201).json(data);
    } catch (error) {
      return res.status(error.status || 400).json(error);
    }
  }

  async update(req, res) {
    const { uid } = req.params;

    try {
      const data = await AttachmentRepository.update(req.file, uid);

      return res.json(data);
    } catch (error) {
      return res.status(error.status || 400).json(error);
    }
  }

  async delete(req, res) {
    const { uid } = req.params;

    try {
      await AttachmentRepository.remove(uid);

      return res.sendStatus(204);
    } catch (error) {
      return res.status(error.status || 400).json(error);
    }
  }
}

export default new AttachmentController();
