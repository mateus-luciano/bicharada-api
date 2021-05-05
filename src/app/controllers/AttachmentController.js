import AttachmentService from '../services/Attachment';

import HttpConstants from '../constants/http';

class AttachmentController {
  async index(req, res) {
    try {
      const data = await AttachmentService.getAll();

      return res.json(data);
    } catch (error) {
      return res.status(error.status || HttpConstants.BadRequest).json(error);
    }
  }

  async show(req, res) {
    const { uid } = req.params;

    try {
      const data = await AttachmentService.find(uid);

      return res.json(data);
    } catch (error) {
      return res.status(error.status || HttpConstants.BadRequest).json(error);
    }
  }

  async store(req, res) {
    const { uid } = req.query;
    const { originalname, filename } = req.file;

    try {
      const data = await AttachmentService.save(originalname, filename, uid);

      return res.status(HttpConstants.Created).json(data);
    } catch (error) {
      return res.status(error.status || HttpConstants.BadRequest).json(error);
    }
  }

  async update(req, res) {
    const { uid } = req.params;
    const { originalname, filename } = req.file;

    try {
      const data = await AttachmentService.update(originalname, filename, uid);

      return res.json(data);
    } catch (error) {
      return res.status(error.status || HttpConstants.BadRequest).json(error);
    }
  }

  async delete(req, res) {
    const { uid } = req.params;
    
    try {
      await AttachmentService.remove(uid);

      return res.sendStatus(HttpConstants.NoContent);
    } catch (error) {
      return res.status(error.status || HttpConstants.BadRequest).json(error);
    }
  }
}

export default new AttachmentController();
