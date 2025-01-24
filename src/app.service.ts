import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AppService {
  health(): string {
    Logger.log('Health endpoint called')
    return 'App is running just fine!';
  }
}
