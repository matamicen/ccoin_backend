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
import { Sdgs as SdgsEntity } from '../sdgs/entities/sdgs.entity';
import { Projects as ProjectEntity } from './entity/projects.entity';
import { ProjectsService } from '../projects/projects.service';
import { SdgsService } from '../sdgs/sdgs.service';

import { Sdgs, Project } from '../types';
import { ApiBody } from '@nestjs/swagger';

@Controller('api/projects')
export class ProjectsController {
  constructor(
    private projectsSevice: ProjectsService,
    private sdgsService: SdgsService,
  ) {}

  @Get()
  async getAll() {
    const result = await this.projectsSevice.findAll();
    return result;
  }

  // @Post('/sdgs')
  // @ApiBody({ type: SdgsEntity })
  // createProject(@Body() body: Sdgs) {
  //   return this.projectsSevice.create_sdgs(body.goal, body.description);
  // }

  @Post()
  @ApiBody({ type: ProjectEntity })
  create(@Body() body: Project) {
    const result = this.projectsSevice.create(body);
    console.log(this.projectsSevice.findAll());
    return result;
  }
}
