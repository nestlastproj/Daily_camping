import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { S3Client } from '@aws-sdk/client-s3';
import multerS3 from 'multer-s3';
import path from 'path';
import { Logger } from '@nestjs/common';
import multer from 'multer';
import fs from 'fs';

export const multerOptionsFactory = (): MulterOptions => {
  const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
  });

  return {
    storage: multerS3({
      s3,
      bucket: process.env.AWS_S3_BUCKET_NAME,
      key(_req, file, done) {
        const ext = path.extname(file.originalname);
        const basename = Math.floor(Math.random() * 100000000);
        done(null, `${basename}_${Date.now()}${ext}`);
      },
    }),
    limits: { fileSize: 5 * 1024 * 1024 },
  };
};

// uploads 폴더가 존재하지 않으면 폴더를 생성하고, 존재하면 생성하지 않습니다.
// const mkdir = (directory: string) => {
//   const logger = new Logger('Mkdir');
//   try {
//     fs.readdirSync(path.join(process.cwd(), directory));
//   } catch (err) {
//     logger.log(`지정한 경로에 ${directory}가 존재하지 않아 ${directory}를 생성합니다.`);
//     fs.mkdirSync(path.join(process.cwd(), directory));
//   }
// };

// mkdir('uploads');

// return {

// storage: multer.diskStorage({
//   destination(req, file, done) {
//     // 파일을 저장할 위치를 설정합니다
//     done(null, path.join(process.cwd(), 'src/public/uploads'));
//   },

//   filename(req, file, done) {
//     // 파일의 이름을 설정합니다.
//     const ext = path.extname(file.originalname); // 파일 확장자 추출
//     const basename = path.basename(file.originalname, ext); // 파일 이름
//     // 파일 이름이 중복되는 것을 막기 위해 '파일이름_날짜.확장자' 의 형식으로 파일이름을 지정합니다.
//     done(null, `${basename}_${Date.now()}${ext}`);
//   },
// }),
// limits: { fileSize: 10 * 1024 * 1024 }, // 10MB로 크기를 제한
// }
