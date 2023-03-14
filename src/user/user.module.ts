import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { UserController } from './user.controller';
import { User } from '../entity/user.entity';
import { UserService } from './user.service';
import { MulterModule } from '@nestjs/platform-express';
import { multerOptionsFactory } from 'src/multer/upload.multer';

@Module({
  imports: [TypeOrmModule.forFeature([User]), MulterModule.registerAsync({ useFactory: multerOptionsFactory })],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
