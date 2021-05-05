import { Router } from 'express';
import RegionController from '../controllers/RegionController';

const routes = new Router();

routes.get('/regions', RegionController.index);
routes.get('/regions/:uid', RegionController.show);
routes.post('/regions', RegionController.store);
routes.put('/regions/:uid', RegionController.update);
routes.delete('/regions/:uid', RegionController.delete);

export default routes;
