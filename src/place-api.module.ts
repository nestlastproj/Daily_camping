import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { Place } from './entity/api/place.entity';
import { PlaceApiController } from './place-api.controller';
import { PlaceApiService } from './place-api.service';

@Module({
  imports: [TypeOrmModule.forFeature(Place)],
  controllers: [PlaceApiController],
  providers: [PlaceApiService],
})
export class PlaceApiModule {}
