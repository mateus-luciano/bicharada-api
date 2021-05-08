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
  #swagger.description = 'Endpoint para buscar um usuário'
  #swagger.security = [{Bearer: []}]
  #swagger.parameters['limit'] = {
    in: 'path',
    description: 'Limite',
    required: true,
    type: 'integer'
  }
  #swagger.parameters['page'] = {
    in: 'path',
    description: 'Número da página',
    required: true,
    type: 'integer'
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
  [authMiddleware, validateUserExists],
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
  [validateData, checkEmail],
  UserControler.store
  /*
  #swagger.tags = ['Usuários']
  #swagger.description = 'Endpoint para cadastrar um usuário'
  #swwager.response[201]

  #swagger.parameters['name'] = {
    in: 'body',
    description: 'nome do usuário',
    required: true,
    type: 'string'
  }
  #swagger.parameters['email'] = {
    in: 'body',
    description: 'E-mail do usuário',
    required: true,
    type: 'string'
  }
  #swagger.parameters['password'] = {
    in: 'body',
    description: 'senha do usuário',
    required: true,
    type: 'string'
  }
  #swagger.parameters['phone'] = {
    in: 'body',
    description: 'telefone do usuário',
    required: true,
    type: 'string'
  }
  #swagger.parameters['city'] = {
    in: 'body',
    description: 'telefone do usuário',
    required: true,
    type: 'string'
  }
  #swagger.parameters['region'] = {
    in: 'body',
    description: 'uid da região do usuário',
    required: true,
    type: 'UUID'
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
  [authMiddleware, validateUserExists, validateData],
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
    description: 'nome do usuário',
    required: true,
    type: 'string'
  }
  #swagger.parameters['email'] = {
    in: 'body',
    description: 'E-mail do usuário',
    required: true,
    type: 'string'
  }
  #swagger.parameters['password'] = {
    in: 'body',
    description: 'senha do usuário',
    required: true,
    type: 'string'
  }
  #swagger.parameters['phone'] = {
    in: 'body',
    description: 'telefone do usuário',
    required: true,
    type: 'string'
  }
  #swagger.parameters['city'] = {
    in: 'body',
    description: 'telefone do usuário',
    required: true,
    type: 'string'
  }
  #swagger.parameters['region'] = {
    in: 'body',
    description: 'uid da região do usuário',
    required: true,
    type: 'uuid'
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
  [authMiddleware, validateUserExists],
  UserControler.delete
  /*
  #swagger.tags = ['Usuários']
  #swagger.description = 'Endpoint para deletar um usuário'
  #swagger.security = [{Bearer: []}]

  #swagger.parameters['uid'] = {
    in: 'path',
    description: 'uid da categoria',
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
