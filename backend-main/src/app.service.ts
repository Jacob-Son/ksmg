import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  checkHealthz(): string {
    return 'ok';
  }
}
