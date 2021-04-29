"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _multer = require('multer'); var _multer2 = _interopRequireDefault(_multer);
var _multer3 = require('../../config/multer'); var _multer4 = _interopRequireDefault(_multer3);
var _AttachmentController = require('../controllers/AttachmentController'); var _AttachmentController2 = _interopRequireDefault(_AttachmentController);

const routes = new (0, _express.Router)();

const upload = _multer2.default.call(void 0, _multer4.default);

routes.get('/attachments', _AttachmentController2.default.index);
routes.get('/attachments/:uid', _AttachmentController2.default.show);
routes.post('/attachments', upload.single('file'), _AttachmentController2.default.store);
routes.put('/attachments/:uid', _AttachmentController2.default.update);
routes.delete('/attachments/:uid', _AttachmentController2.default.delete);

exports. default = routes;
