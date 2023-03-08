import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmConfigService } from './config/typeorm.config.service';
import { PlaceModule } from './place.module';
import { WeatherModule } from './weather.module';
import { ProductModule } from './product.module';
import { HttpModule } from '@nestjs/axios';
import { ScheduleModule } from '@nestjs/schedule/dist/schedule.module';
import * as parser from 'fast-xml-parser';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    HttpModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TypeOrmConfigService,
      inject: [ConfigService],
    }),
    PlaceModule,
    WeatherModule,
    ProductModule,
    ScheduleModule.forRoot(),
    parser.XMLParser,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
