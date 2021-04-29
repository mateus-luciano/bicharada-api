"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _multer = require('multer'); var _multer2 = _interopRequireDefault(_multer);
var _crypto = require('crypto'); var _crypto2 = _interopRequireDefault(_crypto);
var _path = require('path'); var _path2 = _interopRequireDefault(_path);

exports. default = {
  storage: _multer2.default.diskStorage({
    destination: _path2.default.resolve(__dirname, '..', '..', 'tmp', 'uploads'),
    filename: (req, file, callback) => {
      _crypto2.default.randomBytes(16, (error, result) => {
        if (error) {
          return callback(error);
        }

        return callback(
          null,
          result.toString('hex') + _path2.default.extname(file.originalname)
        );
      });
    },
  }),
};
