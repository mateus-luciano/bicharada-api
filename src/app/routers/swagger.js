import { Router } from 'express';
// eslint-disable-next-line import/no-extraneous-dependencies
import swaggerUi from 'swagger-ui-express';
import swaggerDocumention from '../../swagger-documention.json';

const routes = new Router();

routes.use(
  '/documentation',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocumention)
);

export default routes;
