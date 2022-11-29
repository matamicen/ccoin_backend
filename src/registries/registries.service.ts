import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Registries } from './entities/registries.entity';

@Injectable()
export class RegistriesService {
  constructor(
    @InjectRepository(Registries)
    private registriesRepo: Repository<Registries>,
  ) {}
  async findAll(): Promise<Registries[]> {
    return this.registriesRepo.find();
  }
  async findOne(id: number): Promise<Registries> {
    return this.registriesRepo.findOne({
      where: {
        id: id,
      },
    });
  }
}
