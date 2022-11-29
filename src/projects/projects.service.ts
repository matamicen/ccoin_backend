import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SdgsService } from 'src/sdgs/sdgs.service';
import { Projects } from 'src/projects/entity/projects.entity';
import { Project } from 'src/types';
import { Sdgs } from 'src/sdgs/entities/sdgs.entity';

@Injectable()
export class ProjectsService {
  constructor(
    private sdgsService: SdgsService,
    @InjectRepository(Projects) private projectsRepo: Repository<Projects>,
  ) {}

  async findAll(): Promise<Projects[]> {
    return await this.projectsRepo.find({
      relations: ['sdgs'],
    });
  }

  async findBySerial(serial: string): Promise<Projects> {
    return this.projectsRepo.findOne({
      where: {
        serial: serial,
      },
      relations: ['sdgs'],
    });
  }

  async create_sdgs(goal: number, description: string): Promise<any> {
    return await this.sdgsService.create(goal, description);
  }

  async create(project: Project): Promise<any> {
    const goals = [1, 2, 3];
    const allgoals = await this.sdgsService.findByGoals(project.sdgs);
    const newProject = new Projects();
    console.log('viene bien project');
    newProject.title = project.title;
    newProject.description = project.description;
    newProject.serial = project.serial;
    newProject.sdgs = allgoals;
    newProject.project_url = project.project_url;
    console.log('viene bien3');
    return this.projectsRepo.save(newProject);
  }
}
