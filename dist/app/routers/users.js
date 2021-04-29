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
  #swagger.tags = ['Clientes']
  #swagger.description = 'Rota para buscar todos os clientes'

    #swagger.parameters['name'] = {
      in: 'body',
      description: 'Nome do cliente',
      required: false,
      type: 'string'
    }
    #swagger.parameters['phone'] = {
      in: 'body',
      description: 'Telefone do cliente',
      required: false,
      type: 'integer'
    }

    #swagger.response[200] = {
      description: 'Clientes listados',
      schema: { $ref: "#/definitions/customer" }
    }
  */
);
routes.get(
  '/users/:uid',
  _auth2.default,
  _user.validateUserExists,
  _UserController2.default.show
  /*
  #swagger.tags = ['Clientes']
  #swagger.description = 'Rota para procurar e listar um cliente pelo ID'

    #swagger.parameters['id'] = {
      in: 'path',
      description: 'ID do cliente',
      required: true,
      type: 'integer'
    }

    #swagger.response[200] = {
      description: 'Cliente listado',
      schema: { $ref: "#/definitions/customer" }
    }
  */
);
routes.post(
  '/users',
  _user.checkEmail,
  _user.validateData,
  _UserController2.default.store
  /*
  #swagger.tags = ['Clientes']
  #swagger.description = 'Rota para cadastrar um novo cliente'

    #swagger.parameters['name'] = {
      in: 'body',
      description: 'Nome do cliente',
      required: true,
      type: 'string'
    }
    #swagger.parameters['phone'] = {
      in: 'body',
      description: 'Telefone do cliente',
      required: true,
      type: 'integer'
    }
    #swagger.parameters['regionId'] = {
      in: 'body',
      description: 'ID da região do cliente',
      required: true,
      type: 'integer'
    }

    #swagger.response[201] = {
      description: 'Cliente cadastrado',
      schema: { $ref: "#/definitions/customer" }
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
  #swagger.tags = ['Clientes']
  #swagger.description = 'Rota para atualizar os dados de um cliente'

    #swagger.parameters['id'] = {
      in: 'path',
      description: 'ID do cliente',
      required: true,
      type: 'integer'
    }
    #swagger.parameters['name'] = {
      in: 'body',
      description: 'Nome do cliente',
      required: true,
      type: 'string'
    }
    #swagger.parameters['phone'] = {
      in: 'body',
      description: 'Telefone do cliente',
      required: true,
      type: 'integer'
    }
    #swagger.parameters['regionId'] = {
      in: 'body',
      description: 'ID da região do cliente',
      required: true,
      type: 'integer'
    }

    #swagger.response[200] = {
      description: 'Cliente atualizado com sucesso',
      schema: { $ref: "#/definitions/customer" }
    }
  */
);
routes.delete(
  '/users/:uid',
  _auth2.default,
  _user.validateUserExists,
  _UserController2.default.delete
  /*
  #swagger.tags = ['Clientes']
  #swagger.description = 'Rota para deletar um cliente'

    #swagger.parameters['id'] = {
      in: 'path',
      description: 'ID do cliente',
      required: true,
      type: 'integer'
    }

    #swagger.response[204] = {
      description: 'Cliente deletado com sucesso',
      schema: { $ref: "#/definitions/customer" }
    }
  */
);

exports. default = routes;
