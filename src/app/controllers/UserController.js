import UserRepository from '../repositories/UserRepository';

class UserController {
  async index(req, res) {
    const { page, limit } = req.query;

    try {
      const data = await UserRepository.getAll(page ?? 1, limit ?? 100);

      return res.json(data);
    } catch (error) {
      return res.status(error.status || 400).json(error);
    }
  }

  async show(req, res) {
    const { uid } = req.params;

    try {
      const data = await UserRepository.find(uid);

      return res.json(data);
    } catch (error) {
      return res.status(error.status || 400).json(error);
    }
  }

  async store(req, res) {
    try {
      const data = await UserRepository.save(req.body);

      return res.status(201).json(data);
    } catch (error) {
      return res.status(error.status || 400).json(error);
    }
  }

  async update(req, res) {
    const { uid } = req.params;

    try {
      const data = await UserRepository.update(req.body, uid);

      return res.json(data);
    } catch (error) {
      return res.status(error.status || 400).json(error);
    }
  }

  async delete(req, res) {
    const { uid } = req.params;

    try {
      await UserRepository.remove(uid);

      return res.sendStatus(204);
    } catch (error) {
      return res.status(error.status || 400).json(error);
    }
  }
}

export default new UserController();
