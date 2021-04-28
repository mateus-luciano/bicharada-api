import { Router } from 'express';
import AdoptionController from '../controllers/AdoptionController';

const routes = new Router();

routes.get('/users/:uid/adoption', AdoptionController.index);
routes.get('/users/:uid/adoption/:adoptionUid', AdoptionController.show);
routes.post('/users/:uid/adoption', AdoptionController.store);
routes.put('/users/:uid/adoption/:adoptionUid', AdoptionController.update);
routes.delete('/users/:uid/adoption/:adoptionUid', AdoptionController.delete);

export default routes;
