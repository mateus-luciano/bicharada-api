import jwt from 'jsonwebtoken';
import createError from 'http-errors';

import authConfig from '../../config/auth';

import HttpConstants from '../constants/http';
import AuthConstants from '../constants/auth';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw createError(
      HttpConstants.Unauthorized,
      AuthConstants.TokenUnauthorized
    );
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = await jwt.verify(token, authConfig.secret);

    req.uid = decoded.uid;

    next();
  } catch (error) {
    throw createError(HttpConstants.Unauthorized, AuthConstants.TokenInvalid);
  }
};
