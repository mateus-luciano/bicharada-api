"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }// import swagger from './swagger';
var _auth = require('./auth'); var _auth2 = _interopRequireDefault(_auth);
var _users = require('./users'); var _users2 = _interopRequireDefault(_users);
var _adoptions = require('./adoptions'); var _adoptions2 = _interopRequireDefault(_adoptions);
var _attachments = require('./attachments'); var _attachments2 = _interopRequireDefault(_attachments);
var _regions = require('./regions'); var _regions2 = _interopRequireDefault(_regions);

exports. default = [_auth2.default, _users2.default, _adoptions2.default, _attachments2.default, _regions2.default];
