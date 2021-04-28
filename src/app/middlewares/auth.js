import jwt from 'jsonwebtoken';
import authConfig from '../../config/auth';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      message: 'Token não autorizado',
    });
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = await jwt.verify(token, authConfig.secret);

    req.uid = decoded.uid;

    next();
  } catch (error) {
    return res.status(401).json({
      message: 'Token inválido',
    });
  }
};
