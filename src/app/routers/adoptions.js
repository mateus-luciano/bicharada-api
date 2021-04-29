import { Router } from 'express';
import AdoptionController from '../controllers/AdoptionController';
import authMiddleware from '../middlewares/auth';
import { validateData, validateAdoptionExists } from '../middlewares/adoption';

const routes = new Router();

routes.get('/adoptions', AdoptionController.index);
routes.get('/adoptions/:uid', validateAdoptionExists, AdoptionController.show);
routes.post(
  '/adoptions',
  authMiddleware,
  validateData,
  AdoptionController.store
);
routes.put(
  '/adoptions/:uid',
  authMiddleware,
  validateAdoptionExists,
  AdoptionController.update
);
routes.delete(
  '/adoptions/:uid',
  authMiddleware,
  validateAdoptionExists,
  AdoptionController.delete
);

export default routes;
