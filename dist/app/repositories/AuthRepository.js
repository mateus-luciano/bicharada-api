"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
var _crypto = require('crypto'); var _crypto2 = _interopRequireDefault(_crypto);
var _mailer = require('../../config/mailer'); var _mailer2 = _interopRequireDefault(_mailer);
var _auth = require('../../config/auth'); var _auth2 = _interopRequireDefault(_auth);
var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);

class AuthRepository {
  async loginAuthentication(email) {
    const user = await _User2.default.findOne({
      where: {
        email,
      },
    });

    // eslint-disable-next-line camelcase
    const { uid, first_name } = user;

    return {
      user: {
        uid,
        email,
        first_name,
      },
      token: _jsonwebtoken2.default.sign({ uid }, _auth2.default.secret, {
        expiresIn: _auth2.default.expiresIn,
      }),
    };
  }

  async forgotPassword(email) {
    const user = await _User2.default.findOne({
      where: {
        email,
      },
    });

    const token = _crypto2.default.randomBytes(4).toString('hex');

    const now = new Date();
    now.setHours(now.getHours() + 1);

    await _User2.default.update(
      {
        password_reset_token: token,
        password_reset_expires: now,
      },
      {
        where: {
          uid: user.uid,
        },
        returning: true,
      }
    );

    _mailer2.default.sendMail(
      {
        to: email,
        from: 'teeusdm@gmail.com',
        html: `<p>Voce esqueceu sua senha? utilize o token { ${token} }, para recuperar.</p>`,
      },
      (error) => {
        if (error) {
          return { error: 'Não foi possivel enviar o email de recuperação' };
        }
      }
    );

    return { message: 'Mensagem enviada' };
  }

  async resetPassword(body) {
    const { email, password } = body;

    const response = await _User2.default.update(
      { password },
      {
        where: { email },
        returning: true,
      }
    );

    return response;
  }
}

exports. default = new AuthRepository();
