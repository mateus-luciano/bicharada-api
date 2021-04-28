import { Router } from 'express';
import multer from 'multer';
import multerConfig from '../../config/multer';
import AttachmentController from '../controllers/AttachmentController';

const routes = new Router();

const upload = multer(multerConfig);

routes.get('/adoptions/:uid/attachments', AttachmentController.index);
routes.get(
  '/adoptions/:uid/attachments/:attachmentUid',
  AttachmentController.show
);
routes.post(
  '/adoptions/:uid/attachments',
  upload.single('file'),
  AttachmentController.store
);
routes.put(
  '/adoptions/:uid/attachments/:attachmentUid',
  AttachmentController.update
);
routes.delete(
  '/adoptions/:uid/attachments/:attachmentUid',
  AttachmentController.delete
);

export default routes;
