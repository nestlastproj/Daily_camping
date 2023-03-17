import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { Weather } from '../entity/api/weather.entity';
import { WeatherController } from '../weather/weather.controller';
import { WeatherService } from '../weather/weather.service';

@Module({
  imports: [TypeOrmModule.forFeature([Weather])],
  controllers: [WeatherController],
  providers: [WeatherService],
})
export class WeatherModule {}
