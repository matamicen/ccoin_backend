import { Module } from '@nestjs/common';
import { UserController } from './users.controller';
import { UserService } from './users.service';
import { Users } from './entities/users.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TokensService } from 'src/tokens/tokens.service';
import { Tokens } from 'src/tokens/entities/tokens.entity';
import { Wallets } from './entities/wallets.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Users, Tokens, Wallets])],
  controllers: [UserController],
  providers: [UserService, TokensService],
  exports: [UserService],
})
export class UserModule {}
