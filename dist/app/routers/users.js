"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _UserController = require('../controllers/UserController'); var _UserController2 = _interopRequireDefault(_UserController);
var _auth = require('../middlewares/auth'); var _auth2 = _interopRequireDefault(_auth);




var _user = require('../middlewares/user');

const routes = new (0, _express.Router)();

routes.get(
  '/users',
  _auth2.default,
  _UserController2.default.index
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
  _auth2.default,
  _user.validateUserExists,
  _UserController2.default.show
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
  _user.checkEmail,
  _user.validateData,
  _UserController2.default.store
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
  _auth2.default,
  _user.validateUserExists,
  _user.validateData,
  _UserController2.default.update
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
  _auth2.default,
  _user.validateUserExists,
  _UserController2.default.delete
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

exports. default = routes;
