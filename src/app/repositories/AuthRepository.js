import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import mailer from '../../config/mailer';
import authConfig from '../../config/auth';
import User from '../models/User';

class AuthRepository {
  async loginAuthentication(email) {
    const user = await User.findOne({
      where: {
        email,
      },
    });

    const { uid, name } = user;

    return {
      user: {
        uid,
        email,
        name,
      },
      token: jwt.sign({ uid }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    };
  }

  async forgotPassword(email) {
    const user = await User.findOne({
      where: {
        email,
      },
    });

    const token = crypto.randomBytes(4).toString('hex');

    const now = new Date();
    now.setHours(now.getHours() + 1);

    await User.update(
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

    mailer.sendMail(
      {
        to: email,
        from: 'teeusdm@gmail.com',
        html: `<p>Voce esqueceu sua senha? utilize o token { ${token} }, para recuperar.</p>`,
      },
      error => {
        if (error) {
          return { error: 'Não foi possivel enviar o email de recuperação' };
        }
      }
    );

    return { message: 'Mensagem enviada' };
  }

  async resetPassword(body) {
    const { email, password } = body;

    const response = await User.update(
      { password },
      {
        where: { email },
        returning: true,
      }
    );

    return response;
  }
}

export default new AuthRepository();
