import { Router } from 'express';
import AdoptionController from '../controllers/AdoptionController';
import authMiddleware from '../middlewares/auth';

const routes = new Router();

routes.get('/adoptions', AdoptionController.index);
routes.get('/adoptions/:uid', AdoptionController.show);
routes.post('/adoptions', authMiddleware, AdoptionController.store);
routes.put('/adoptions/:uid', authMiddleware, AdoptionController.update);
routes.delete('/adoptions/:uid', authMiddleware, AdoptionController.delete);

export default routes;
