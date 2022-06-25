import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getServer(): string {
    return 'Server is Running on port ' + process.env.API_PORT;
  }
}
