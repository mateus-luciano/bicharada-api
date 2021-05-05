import createError from 'http-errors';

import User from '../models/User';

import HttpConstants from '../constants/http';
import ResetPasswordConstants from '../constants/resetPassword';

function validateData(req, res, next) {
  const { email } = req.body;

  if (!email) {
    throw createError(
      HttpConstants.BadRequest,
      ResetPasswordConstants.InvalidEmail
    );
  }

  next();
}

function validateDataToken(req, res, next) {
  const { email, password, token } = req.body;

  if (!email || !password || !token) {
    throw createError(
      HttpConstants.BadRequest,
      ResetPasswordConstants.InvalidData
    );
  }

  next();
}

async function validateToken(req, res, next) {
  const { email, token } = req.body;

  const now = new Date();

  const user = await User.findOne({
    where: { email },
  });

  if (token !== user.password_reset_token) {
    throw createError(
      HttpConstants.Unauthorized,
      ResetPasswordConstants.InvalidToken
    );
  }

  if (now > user.password_reset_expires) {
    throw createError(
      HttpConstants.Unauthorized,
      ResetPasswordConstants.ExpiredToken
    );
  }

  next();
}
export { validateData, validateDataToken, validateToken };
