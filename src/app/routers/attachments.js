import { Router } from 'express';
import multer from 'multer';
import multerConfig from '../../config/multer';
import AttachmentController from '../controllers/AttachmentController';

const routes = new Router();

const upload = multer(multerConfig);

routes.get('/attachments', AttachmentController.index);
routes.get('/attachments/:uid', AttachmentController.show);
routes.post('/attachments', upload.single('file'), AttachmentController.store);
routes.put('/attachments/:uid', AttachmentController.update);
routes.delete('/attachments/:uid', AttachmentController.delete);

export default routes;
