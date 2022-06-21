import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Delete,
  Put,
} from '@nestjs/common';

@Controller('api/users')
export class UserController {
  @Get()
  getHello(): string {
    return 'sdsdsd3333';
  }
  @Get(':id')
  getUser(@Param('id') id: number): string {
    return `getUser: ${id}`;
  }

  @Post()
  createUser(@Body() body: any): string {
    return `CreateUser: ${JSON.stringify(body)}`;
  }

  @Put(':id')
  editeUser(@Param('id') id: number, @Body() body: any): string {
    return `edit: ${id} ${JSON.stringify(body)}`;
  }

  @Delete(':id')
  deleteUser(@Param('id') id: number): boolean {
    return true;
  }
}
