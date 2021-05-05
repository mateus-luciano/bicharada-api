import { Router } from 'express';
import UserControler from '../controllers/UserController';
import authMiddleware from '../middlewares/auth';
import {
  validateData,
  checkEmail,
  validateUserExists,
} from '../middlewares/user';

const routes = new Router();

routes.get(
  '/users',
  authMiddleware,
  UserControler.index
  /*
  #swagger.tags = ['Usuários']
  #swagger.description = 'Endpoint para buscar todos os usuários'
  #swagger.security = [{Bearer: []}]
  #swagger.response[200] = {
    description: 'Lista de usuários',
    schema: {
      $ref: "#definitions/UserList"
    }
  }
    #swagger.responses[400] = {
      schema: {
        message: 'BAD_REQUEST'
      }
    }
  */
);
routes.get(
  '/users/:uid',
  authMiddleware,
  validateUserExists,
  UserControler.show
  /*
  #swagger.tags = ['Usuários']
  #swagger.description = 'Endpoint para buscar um usuário'
  #swagger.security = [{Bearer: []}]
  #swagger.parameters['uid'] = {
    in: 'path',
    description: 'UID do usuário',
    required: true,
    type: 'UUID',
    schema: {
      "$ref": "#definitions/UserList"
    },
  }
    #swagger.responses[404] = {
      schema: {
        message: 'NOT_FOUND'
      }
    }
  */
);
routes.post(
  '/users',
  checkEmail,
  validateData,
  UserControler.store
  /*
  #swagger.tags = ['Usuários']
  #swagger.description = 'Endpoint para cadastrar um usuário'
  #swagger.security = [{Bearer: []}]
  #swagger.parameters['Users'] = {
    in: 'body',
    description: 'Cadastrar novo usuário',
    required: true,
    type: 'string',
    schema: {
      $ref: "#definitions/UserStore"
    }
  }
    #swagger.responses[400] = {
      schema: {
        message: 'BAD_REQUEST'
      }
    }
  */
);
routes.put(
  '/users/:uid',
  authMiddleware,
  validateUserExists,
  validateData,
  UserControler.update
  /*
  #swagger.tags = ['Usuários']
  #swagger.description = 'Endpoint para atualizar uma categotia'
  #swagger.security = [{Bearer: []}]
  #swagger.parameters['uid'] = {
    in: 'path',
    description: 'UID do usuário',
    required: true,
    type: 'UUID',
  }
  #swagger.parameters['name'] = {
    in: 'body',
    description: 'Nome da categoria',
    required: true,
    type: 'string'
    }
  #swagger.response[200] = {
    description: 'Categoria atualizada com sucesso',
    schema: {
      $ref: "#definitions/UserUpdate"
    }
  }
  #swagger.responses[400] = {
    schema: {
      message: 'BAD_REQUEST'
    }
  }
  #swagger.responses[404] = {
    schema: {
      message: 'NOT_FOUND'
    }
  }
  */
);
routes.delete(
  '/users/:uid',
  authMiddleware,
  validateUserExists,
  UserControler.delete
  /*
  #swagger.tags = ['Usuários']
  #swagger.description = 'Endpoint para deletar uma categotia'
  #swagger.security = [{Bearer: []}]
  #swagger.parameters['uid'] = {
    in: 'path',
    description: 'ID da categoria',
    required: true,
    type: 'UUID',
  } 
  #swagger.response[204] = {
    description: 'Categoria deletada com sucesso',
    schema: {
      $ref: "#/definitions/User"
    }
  }
    #swagger.responses[400] = {
      schema: {
        message: 'BAD_REQUEST'
      }
    }
    #swagger.responses[404] = {
      schema: {
        message: 'NOT_FOUND'
      }
    }
  */
);

export default routes;
