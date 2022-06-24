import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  async findAll(): Promise<User[]> {
    return this.userRepo.find();
  }

  async findOne(id: number): Promise<User> {
    return this.userRepo.findOne({
      where: {
        id: id,
      },
    });
  }

  async create(body: any): Promise<User> {
    console.log('viene bien1');
    const newUser = new User();
    console.log('viene bien2');
    newUser.name = body.name;
    newUser.lastname = body.lastname;
    newUser.email = body.email;
    console.log('viene bien3');
    newUser.email2 = body.email2;
    return this.userRepo.save(newUser);
  }
}
