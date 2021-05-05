import UserService from '../services/User';

import HttpConstants from '../constants/http';

class UserController {
  async index(req, res) {
    const { limit, page } = req.query;

    try {
      const data = await UserService.getAll(limit ?? 10, page ?? 1);

      return res.json(data);
    } catch (error) {
      return res.status(error.status || HttpConstants.BadRequest).json(error);
    }
  }

  async show(req, res) {
    const { uid } = req.params;

    try {
      const data = await UserService.find(uid);

      return res.json(data);
    } catch (error) {
      return res.status(error.status || HttpConstants.BadRequest).json(error);
    }
  }

  async store(req, res) {
    const { email, password, name, city, phone } = req.body;

    try {
      const data = await UserService.save(email, password, name, city, phone);

      return res.status(HttpConstants.Created).json(data);
    } catch (error) {
      return res.status(error.status || HttpConstants.BadRequest).json(error);
    }
  }

  async update(req, res) {
    const { uid } = req.params;
    const { email, password, name, city, phone } = req.body;

    try {
      const data = await UserService.update(
        email,
        password,
        name,
        city,
        phone,
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
      await UserService.remove(uid);

      return res.sendStatus(HttpConstants.NoContent);
    } catch (error) {
      return res.status(error.status || HttpConstants.BadRequest).json(error);
    }
  }
}

export default new UserController();
