import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { Place } from '../entity/api/place.entity';
import { PlaceController } from '../place/place.controller';
import { PlaceService } from '../place/place.service';

@Module({
  imports: [TypeOrmModule.forFeature([Place]), HttpModule],
  controllers: [PlaceController],
  providers: [PlaceService],
})
export class PlaceModule {}
