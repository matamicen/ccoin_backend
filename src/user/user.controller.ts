import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ConfigService } from '@nestjs/config';
import { User } from '../types';
import { User as UserEntity } from './entities/user.entity';
import { ApiBody } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@Controller('api/users')
export class UserController {
  constructor(
    private userSevice: UserService,
    private configService: ConfigService,
  ) {}

  @Get()
  getAll() {
    console.log(this.configService.get('DATABASE_NAME'));
    console.log('pepe10');
    return this.userSevice.findAll();
  }
  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  getUser(@Param('id') id: number) {
    return this.userSevice.findOne(id);
  }

  @Post()
  @ApiBody({ type: UserEntity })
  createUser(@Body() body: User) {
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
