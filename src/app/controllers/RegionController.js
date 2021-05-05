import RegionService from '../services/Region';

import HttpConstants from '../constants/http';

class RegionController {
  async index(req, res) {
    try {
      const data = await RegionService.getAll();

      return res.json(data);
    } catch (error) {
      return res.status(error.status || HttpConstants.BadRequest).json(error);
    }
  }

  async show(req, res) {
    const { uid } = req.params;

    try {
      const data = await RegionService.find(uid);

      return res.json(data);
    } catch (error) {
      return res.status(error.status || HttpConstants.BadRequest).json(error);
    }
  }

  async store(req, res) {
    const { name } = req.body;

    try {
      const data = await RegionService.save(name);

      return res.status(HttpConstants.Created).json(data);
    } catch (error) {
      return res.status(error.status || HttpConstants.BadRequest).json(error);
    }
  }

  async update(req, res) {
    const { uid } = req.params;
    const { name } = req.body;

    try {
      const data = await RegionService.update(name, uid);

      return res.json(data);
    } catch (error) {
      return res.status(error.status || HttpConstants.BadRequest).json(error);
    }
  }

  async delete(req, res) {
    const { uid } = req.params;

    try {
      await RegionService.remove(uid);

      return res.sendStatus(HttpConstants.NoContent);
    } catch (error) {
      return res.status(error.status || HttpConstants.BadRequest).json(error);
    }
  }
}

export default new RegionController();
