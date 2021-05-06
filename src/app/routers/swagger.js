import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerDocumention from '../../swagger-documention.json';

const routes = new Router();

routes.use(
  '/documentation',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocumention)
);

export default routes;
