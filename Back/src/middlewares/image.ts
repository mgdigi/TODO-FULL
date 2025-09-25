import multer from 'multer';
import path from 'path';
import { ErreurMessages } from '../utils/errorsMessage.js';

const storage = multer.diskStorage({
    destination: (_req, _file, cb) => {
        cb(null, 'uploads/'); 
    },
    filename: (_req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const fileFilter = (_req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error(ErreurMessages.IMAGEUPLOADED));
    }
};

export const upload = multer({ 
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024 
    }
});