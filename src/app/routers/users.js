import { Router } from 'express';
import UserControler from '../controllers/UserController';
import authMiddleware from '../middlewares/auth';
import {
  validateData,
  checkEmail,
  validateUserExists,
} from '../middlewares/user';

const routes = new Router();

routes.get('/users', authMiddleware, UserControler.index);
routes.get(
  '/users/:uid',
  authMiddleware,
  validateUserExists,
  UserControler.show
);
routes.post('/users', checkEmail, validateData, UserControler.store);
routes.put(
  '/users/:uid',
  authMiddleware,
  validateUserExists,
  validateData,
  UserControler.update
);
routes.delete(
  '/users/:uid',
  authMiddleware,
  validateUserExists,
  UserControler.delete
);

export default routes;
