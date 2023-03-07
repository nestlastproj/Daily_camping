import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JwtConfigService } from './config/jwt.config.service';
import { TypeOrmConfigService } from './config/typeorm.config.service';
import { PlaceModule } from './place.module';
import { WeatherModule } from './weather.module';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ProductModule } from './product.module';
import { HttpModule } from '@nestjs/axios';

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
