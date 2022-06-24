import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Delete,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';

@Controller('api/users')
export class UserController {
  constructor(private userSevice: UserService) {}

  @Get()
  getAll() {
    return this.userSevice.findAll();
  }
  @Get(':id')
  getUser(@Param('id') id: number) {
    return this.userSevice.findOne(id);
  }

  @Post()
  createUser(@Body() body: any) {
    return this.userSevice.create(body);
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
