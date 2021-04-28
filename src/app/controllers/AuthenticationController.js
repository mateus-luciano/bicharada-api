import AuthenticationRepository from '../repositories/AuthenticationRepository';

class AuthenticationController {
  async login(req, res) {
    const { email } = req.body;

    try {
      const data = await AuthenticationRepository.loginAuthentication(email);

      return res.json(data);
    } catch (error) {
      return res.status(error.status || 400).json(error);
    }
  }

  async forgotPassword(req, res) {
    const { email } = req.body;

    try {
      const data = await AuthenticationRepository.forgotPassword(email);

      return res.json(data);
    } catch (error) {
      return res.status(error.status || 400).json(error);
    }
  }

  async resetPassword(req, res) {
    try {
      const data = await AuthenticationRepository.resetPassword(req.body);

      return res.json(data);
    } catch (error) {
      return res.status(error.status || 400).json(error);
    }
  }
}

export default new AuthenticationController();
