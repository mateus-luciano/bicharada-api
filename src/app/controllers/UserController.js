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

  async store(req, res) {
    try {
      const data = await UserRepository.save(req.body);

      return res.status(201).json(data);
    } catch (error) {
      return res.status(error.status || 400).json(error);
    }
  }
}

export default new UserController();
