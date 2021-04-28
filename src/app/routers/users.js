import { Router } from 'express';
import UserControler from '../controllers/UserController';
import {
  validateData,
  checkEmail,
  validateUserExists,
} from '../middlewares/user';

const routes = new Router();

routes.get('/users', UserControler.index);
routes.get('/users/:uid', validateUserExists, UserControler.show);
routes.post('/users', checkEmail, validateData, UserControler.store);
routes.put(
  '/users/:uid',
  validateUserExists,
  validateData,
  UserControler.update
);
routes.delete('/users/:uid', validateUserExists, UserControler.delete);

export default routes;
