import AdoptionService from '../services/Adoption';

import HttpConstants from '../constants/http';

class AdoptionController {
  async index(req, res) {
    const { limit, page, filter } = req.query;

    try {
      const data = await AdoptionService.getAll(limit ?? 10, page ?? 1, filter);

      return res.json(data);
    } catch (error) {
      return res.status(error.status || HttpConstants.BadRequest).json(error);
    }
  }

  async show(req, res) {
    const { uid } = req.params;

    try {
      const data = await AdoptionService.find(uid);

      return res.json(data);
    } catch (error) {
      return res.status(error.status || HttpConstants.BadRequest).json(error);
    }
  }

  async store(req, res) {
    const { title, description, address, type, region } = req.body;

    try {
      const data = await AdoptionService.save(
        title,
        description,
        address,
        type,
        region,
        req.uid
      );

      return res.status(HttpConstants.Created).json(data);
    } catch (error) {
      return res.status(error.status || HttpConstants.BadRequest).json(error);
    }
  }

  async update(req, res) {
    const { uid } = req.params;
    const { title, description, address, type, region } = req.body;

    try {
      const data = await AdoptionService.update(
        title,
        description,
        address,
        type,
        region,
        uid
      );

      return res.json(data);
    } catch (error) {
      return res.status(error.status || HttpConstants.BadRequest).json(error);
    }
  }

  async delete(req, res) {
    const { uid } = req.params;

    try {
      await AdoptionService.remove(uid);

      return res.sendStatus(HttpConstants.NoContent);
    } catch (error) {
      return res.status(error.status || HttpConstants.BadRequest).json(error);
    }
  }
}

export default new AdoptionController();
