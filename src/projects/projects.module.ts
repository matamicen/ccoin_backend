import { Module } from '@nestjs/common';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { SdgsService } from '../sdgs/sdgs.service';
import { SdgsModule } from 'src/sdgs/sdgs.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Projects } from './entity/projects.entity';
import { Sdgs } from '../sdgs/entities/sdgs.entity';
import { Registries } from 'src/registries/entities/registries.entity';
import { RegistriesService } from 'src/registries/registries.service';

@Module({
  imports: [TypeOrmModule.forFeature([Projects, Sdgs, Registries])],
  controllers: [ProjectsController],
  providers: [ProjectsService, SdgsService, RegistriesService],
})
export class ProjectsModule {}
