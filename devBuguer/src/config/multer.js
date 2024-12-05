import multer from 'multer';
import { v4 } from 'uuid';

import path from 'node:path';

export const Storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve('uploads'));
  },
  filename: (req, file, callback) => {
    callback(null, v4() + file.originalname);
  },
});
