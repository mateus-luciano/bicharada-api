import createError from 'http-errors';

import User from '../models/User';

import HttpConstants from '../constants/http';
import LoginConstants from '../constants/login';

async function checkUserExists(req, res, next) {
  const { email } = req.body;

  const user = await User.findOne({
    where: { email },
  });

  if (!user) {
    throw createError(HttpConstants.BadRequest, LoginConstants.InvalidEmail);
  }

  next();
}

async function checkPassword(req, res, next) {
  const { email, password } = req.body;

  const user = await User.findOne({
    where: { email },
  });

  if (!(await user.checkPassword(password))) {
    throw createError(
      HttpConstants.Unauthorized,
      LoginConstants.InvalidPassword
    );
  }

  next();
}

export { checkUserExists, checkPassword };
