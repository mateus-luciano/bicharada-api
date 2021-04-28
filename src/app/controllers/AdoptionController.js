import AdoptionRepository from '../repositories/AdoptionRepository';

class AdoptionController {
  async index(req, res) {
    const { page, limit } = req.query;

    try {
      const data = await AdoptionRepository.getAll(page ?? 1, limit ?? 10);

      return res.json(data);
    } catch (error) {
      return res.status(error.status || 400).json(error);
    }
  }

  async show(req, res) {
    const { uid } = req.params;

    try {
      const data = await AdoptionRepository.find(uid);

      return res.json(data);
    } catch (error) {
      return res.status(error.status || 400).json(error);
    }
  }

  async store(req, res) {
    try {
      const data = await AdoptionRepository.save(req.body, req.uid);

      return res.status(201).json(data);
    } catch (error) {
      return res.status(error.status || 400).json(error);
    }
  }

  async update(req, res) {
    const { uid } = req.params;

    try {
      const data = await AdoptionRepository.update(req.body, uid);

      return res.json(data);
    } catch (error) {
      return res.status(error.status || 400).json(error);
    }
  }

  async delete(req, res) {
    const { uid } = req.params;

    try {
      await AdoptionRepository.remove(uid);

      return res.sendStatus(204);
    } catch (error) {
      return res.status(error.status || 400).json(error);
    }
  }
}

export default new AdoptionController();
