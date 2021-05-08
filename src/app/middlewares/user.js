import createError from 'http-errors';

import User from '../models/User';

import HttpConstants from '../constants/http';
import UserConstants from '../constants/user';

function validateData(req, res, next) {
  const { email, password, name, city, phone } = req.body;

  if (!email || !password || !name || !city || !phone) {
    throw createError(HttpConstants.BadRequest, UserConstants.InvalidData);
  }

  next();
}

async function checkEmail(req, res, next) {
  const { email } = req.body;

  const user = await User.findOne({
    where: { email },
  });

  if (user) {
    // throw createError(HttpConstants.Conflict, UserConstants.InvalidEmail);
    return res
      .status(HttpConstants.Conflict)
      .json({ message: UserConstants.InvalidEmail });
  }

  next();
}

async function validateUserExists(req, res, next) {
  const { uid } = req.params;

  const user = await User.findOne({
    where: { uid },
  });

  if (!user) {
    // throw createError(HttpConstants.NotFound, UserConstants.UserNotFound);
    return res
      .status(HttpConstants.NotFound)
      .json({ message: UserConstants.UserNotFound });
  }

  next();
}

export { validateData, checkEmail, validateUserExists };
