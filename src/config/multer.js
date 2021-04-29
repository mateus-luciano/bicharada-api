import multer from 'multer';
import crypto from 'crypto';
import path from 'path';

export default {
  dest: path.resolve(__dirname, '..', '..', 'tmp', 'uploads'),
  storage: multer.diskStorage({
    destination: path.resolve(__dirname, '..', '..', 'tmp', 'uploads'),
    filename: (req, file, callback) => {
      crypto.randomBytes(16, (error, result) => {
        if (error) {
          return callback(error);
        }

        return callback(
          null,
          result.toString('hex') + path.extname(file.originalname)
        );
      });
    },
  }),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 mb
  },
  fileFilter: (req, file, callback) => {
    const allowedMimes = [
      'image/jpeg',
      'image/pjpeg',
      'image/png',
      'image/gif',
    ];

    if (allowedMimes.includes(file.mimetype)) {
      return callback(null, true);
    }
    return callback(new Error('Invalid file type.'));
  },
};
