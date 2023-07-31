import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): any {
    return { message: `Hello World, I'm Wesley Ricarte` };
  }
}
