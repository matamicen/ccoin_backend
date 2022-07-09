import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Res() response): string {
    return response.status(HttpStatus.ACCEPTED).send('ok matt30');
    // return this.appService.getHello();
  }
}
