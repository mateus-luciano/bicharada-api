import { Router } from 'express';
import UserControler from '../controllers/UserController';

const routes = new Router();

routes.get('/users', UserControler.index);
routes.get('/users/:uid', UserControler.show);
routes.post('/users', UserControler.store);
routes.put('/users/:uid', UserControler.update);
routes.delete('/users/:uid', UserControler.delete);

export default routes;
