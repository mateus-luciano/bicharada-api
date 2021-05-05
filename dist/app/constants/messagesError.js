"use strict";Object.defineProperty(exports, "__esModule", {value: true});class MessagesError {
  static get InvalidParams() {
    return 'Dados inválidos';
  }

  static get NotFound() {
    return 'Não encontrado';
  }

  static get Unauthorized() {
    return 'Não autorizado';
  }
}

exports. default = MessagesError;
