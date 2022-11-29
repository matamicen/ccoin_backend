import { Module } from '@nestjs/common';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { SdgsService } from '../sdgs/sdgs.service';
import { SdgsModule } from 'src/sdgs/sdgs.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Projects } from './entity/projects.entity';
import { Sdgs } from '../sdgs/entities/sdgs.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Projects, Sdgs])],
  controllers: [ProjectsController],
  providers: [ProjectsService, SdgsService],
})
export class ProjectsModule {}
