import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Sdgs } from './entities/sdgs.entity';

@Injectable()
export class SdgsService {
  constructor(@InjectRepository(Sdgs) private sdgsRepo: Repository<Sdgs>) {}
  async findAll(): Promise<Sdgs[]> {
    return this.sdgsRepo.find();
  }
  async findOne(id: number): Promise<Sdgs> {
    return this.sdgsRepo.findOne({
      where: {
        id: id,
      },
    });
  }

  async findByGoal(goal: number): Promise<Sdgs> {
    return this.sdgsRepo.findOne({
      where: {
        goal: goal,
      },
      relations: ['projects'],
    });
  }

  // bring all the goals objects by goal number
  async findByGoals(goals: number[]): Promise<Sdgs[]> {
    // const goals = ['1', '2', '3'];
    const resultGoals = await this.sdgsRepo.find({
      where: {
        goal: In(goals),
      },
    });

    return resultGoals;
  }

  async update(sdgs: Sdgs): Promise<Sdgs> {
    return this.sdgsRepo.save(sdgs);
  }

  async create(goal: number, description: string): Promise<Sdgs> {
    console.log('viene bien sdgs');
    const newSdgs = new Sdgs();
    console.log('viene sdgs');
    newSdgs.goal = goal;
    newSdgs.description = description;
    console.log('viene bien3');
    return this.sdgsRepo.save(newSdgs);
  }
}
