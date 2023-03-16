import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { User } from '../entity/user.entity';
import { UserService } from './user.service';
import { MulterModule } from '@nestjs/platform-express';
import { multerOptionsFactory } from 'src/util/upload.multer';

@Module({
  imports: [TypeOrmModule.forFeature([User]), MulterModule.registerAsync({ useFactory: multerOptionsFactory })],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
