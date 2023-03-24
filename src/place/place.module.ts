import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { Like } from 'src/entity/like.entity';
import { LikeModule } from 'src/like/like.module';
import { Place } from '../entity/api/place.entity';
import { PlaceController } from '../place/place.controller';
import { PlaceService } from '../place/place.service';

@Module({
  imports: [TypeOrmModule.forFeature([Place, Like]), HttpModule, LikeModule],
  controllers: [PlaceController],
  providers: [PlaceService],
})
export class PlaceModule {}
