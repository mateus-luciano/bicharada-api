import { Router } from 'express';
import UserControler from '../controllers/UserController';

const routes = new Router();

routes.get('/users', UserControler.index);
routes.post('/users', UserControler.store);

export default routes;
