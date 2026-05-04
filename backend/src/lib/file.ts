import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import {
  FileTypeException,
  FileTypeVideoException,
} from 'src/modules/files/exceptions/file.exception';
import { existsSync, mkdirSync } from 'fs';
import { diskStorage } from 'multer';
import { Request } from 'express';

export const fileOption: MulterOptions = {
  storage: diskStorage({
    destination: (
      req: Request,
      file: Express.Multer.File,
      cb: (err: Error | null, destination: string) => void,
    ) => {
      const uploadPath = 'medias';
      if (!existsSync(uploadPath)) {
        mkdirSync(uploadPath);
      }
      cb(null, uploadPath);
    },
    filename: (
      req: Request,
      file: Express.Multer.File,
      cb: (err: Error | null, filename: string) => void,
    ) => {
      cb(
        null,
        `${file.mimetype.split('/')[0]}__${Date.now()}.${file.mimetype.split('/')[1]}`,
      );
    },
  }),
  fileFilter: (
    req: Request,
    file: Express.Multer.File,
    cb: (err: Error | null, acceptFile: boolean) => void,
  ) => {
    const fileType = file.mimetype.split('/')[0];
    if (fileType === 'image') {
      cb(null, true);
    } else {
      cb(new FileTypeException(fileType), false);
    }
  },
};

export const fileOptionVideo: MulterOptions = {
  storage: diskStorage({
    destination: (
      req: Request,
      file: Express.Multer.File,
      cb: (err: Error | null, destination: string) => void,
    ) => {
      const uploadPath = 'medias';
      if (!existsSync(uploadPath)) {
        mkdirSync(uploadPath);
      }
      cb(null, uploadPath);
    },
    filename: (
      req: Request,
      file: Express.Multer.File,
      cb: (err: Error | null, filename: string) => void,
    ) => {
      cb(
        null,
        `${file.mimetype.split('/')[0]}__${Date.now()}.${file.mimetype.split('/')[1]}`,
      );
    },
  }),
  fileFilter: (
    req: Request,
    file: Express.Multer.File,
    cb: (err: Error | null, acceptFile: boolean) => void,
  ) => {
    const fileType = file.mimetype.split('/')[0];
    if (fileType === 'video') {
      cb(null, true);
    } else {
      cb(new FileTypeVideoException(fileType), false);
    }
  },
};
