import { Router } from 'express';
import AuthController from '../controllers/AuthController';
import { checkUserExists, checkPassword } from '../middlewares/authLogin';
import {
  validateData,
  validateDataToken,
  validateToken,
} from '../middlewares/resetPassword';

const routes = new Router();

routes.post('/login', checkUserExists, checkPassword, AuthController.login);
routes.post(
  '/forgot-password',
  validateData,
  checkUserExists,
  AuthController.forgotPassword
);
routes.post(
  '/reset-password',
  validateData,
  validateDataToken,
  validateToken,
  AuthController.resetPassword
);

export default routes;
