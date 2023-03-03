import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);
  getHello(): string {
    return 'Hello World!';
  }
  @Cron('10 * * * * *')
  handleCron() {
    this.logger.debug('10초마다 불러온다');
  }
  @Cron(CronExpression.EVERY_30_SECONDS)
  handleCron2() {
    this.logger.debug('30초마다 불러온다');
  }
}
