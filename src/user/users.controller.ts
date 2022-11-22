import {
  Controller,
  Get,
  Param,
  Req,
  Post,
  Body,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './users.service';
import { ConfigService } from '@nestjs/config';
import { User } from '../types';
import { Users as UserEntity } from './entities/users.entity';
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
  getUser(@Param('id') id: number, @Req() req: any) {
    console.log(req.user);
    return this.userSevice.findOne(id);
  }

  @Get('/challenge/:wallet')
  async getUserChallenge(@Param('wallet') wallet: string) {
    console.log('wallet:' + wallet);
    const authenticationTransaction: string =
      await this.userSevice.generateChallengeTx(wallet);
    console.log('authenticationTransaction');
    console.log(authenticationTransaction);
    const obj = { tx: authenticationTransaction };
    return obj;
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
