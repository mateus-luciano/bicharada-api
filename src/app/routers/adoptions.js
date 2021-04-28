import { Router } from 'express';
import AdoptionController from '../controllers/AdoptionController';

const routes = new Router();

routes.get('/adoptions', AdoptionController.index);
routes.get('/adoptions/:uid', AdoptionController.show);
routes.post('/adoptions', AdoptionController.store);
routes.put('/adoptions/:uid', AdoptionController.update);
routes.delete('/adoptions/:uid', AdoptionController.delete);

export default routes;
