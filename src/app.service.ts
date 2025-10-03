import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hola esta es mi primera aplicacion con NestJS';
  }
}
