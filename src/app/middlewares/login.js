// import createError from 'http-errors';

import User from '../models/User';

import HttpConstants from '../constants/http';
import LoginConstants from '../constants/login';

async function checkUserExists(req, res, next) {
  const { email } = req.body;

  const user = await User.findOne({
    where: { email },
  });

  if (!email) {
    return res
      .status(HttpConstants.BadRequest)
      .json({ message: LoginConstants.EmptyEmail });
  }

  if (!user) {
    return res
      .status(HttpConstants.BadRequest)
      .json({ message: LoginConstants.InvalidEmail });
    // throw createError(HttpConstants.BadRequest, LoginConstants.InvalidEmail);
  }

  next();
}

async function checkPassword(req, res, next) {
  const { email, password } = req.body;

  if (!password) {
    return res
      .status(HttpConstants.BadRequest)
      .json({ message: LoginConstants.EmptyPassword });
  }

  const user = await User.findOne({
    where: { email },
  });

  if (!(await user.checkPassword(password))) {
    return res
      .status(HttpConstants.Unauthorized)
      .json({ message: LoginConstants.InvalidPassword });
    // throw createError(
    //   HttpConstants.Unauthorized,
    //   LoginConstants.InvalidPassword
    // );
  }

  next();
}

export { checkUserExists, checkPassword };
