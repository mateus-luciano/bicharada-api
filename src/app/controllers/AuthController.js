import AuthRepository from '../repositories/AuthRepository';

class AuthenticationController {
  async login(req, res) {
    const { email } = req.body;

    try {
      const data = await AuthRepository.loginAuthentication(email);

      return res.json(data);
    } catch (error) {
      return res.status(error.status || 400).json(error);
    }
  }

  async forgotPassword(req, res) {
    const { email } = req.body;

    try {
      const data = await AuthRepository.forgotPassword(email);

      return res.json(data);
    } catch (error) {
      return res.status(error.status || 400).json(error);
    }
  }

  async resetPassword(req, res) {
    try {
      const data = await AuthRepository.resetPassword(req.body);

      return res.json(data);
    } catch (error) {
      return res.status(error.status || 400).json(error);
    }
  }
}

export default new AuthenticationController();
