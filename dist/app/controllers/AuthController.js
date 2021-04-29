"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _AuthRepository = require('../repositories/AuthRepository'); var _AuthRepository2 = _interopRequireDefault(_AuthRepository);

class AuthenticationController {
  async login(req, res) {
    const { email } = req.body;

    try {
      const data = await _AuthRepository2.default.loginAuthentication(email);

      return res.json(data);
    } catch (error) {
      return res.status(error.status || 400).json(error);
    }
  }

  async forgotPassword(req, res) {
    const { email } = req.body;

    try {
      const data = await _AuthRepository2.default.forgotPassword(email);

      return res.json(data);
    } catch (error) {
      return res.status(error.status || 400).json(error);
    }
  }

  async resetPassword(req, res) {
    try {
      const data = await _AuthRepository2.default.resetPassword(req.body);

      return res.json(data);
    } catch (error) {
      return res.status(error.status || 400).json(error);
    }
  }
}

exports. default = new AuthenticationController();
