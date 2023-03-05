import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { Place } from './entity/api/place.entity';
import { PlaceController } from './place.controller';
import { PlaceService } from './place.service';

@Module({
  imports: [TypeOrmModule.forFeature([Place])],
  controllers: [PlaceController],
  providers: [PlaceService],
})
export class PlaceModule {}
