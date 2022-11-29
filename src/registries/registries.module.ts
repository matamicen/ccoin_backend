import { Module } from '@nestjs/common';
import { Registries } from './entities/registries.entity';
import { RegistriesService } from './registries.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Registries])],
  providers: [RegistriesService],
  exports: [RegistriesService],
})
export class RegistriesModule {}
