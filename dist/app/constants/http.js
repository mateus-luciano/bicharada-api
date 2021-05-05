"use strict";Object.defineProperty(exports, "__esModule", {value: true});class HttpConstants {
  // 2XX Success
  static get OK() {
    return 200;
  }

  static get Created() {
    return 201;
  }

  static get Accepted() {
    return 202;
  }

  static get NoContent() {
    return 204;
  }

  // 4XX Client errors
  static get BadRequest() {
    return 400;
  }

  static get Unauthorized() {
    return 401;
  }

  static get NotFound() {
    return 404;
  }

  static get Conflict() {
    return 409;
  }
}

exports. default = HttpConstants;
