import { Module } from '@nestjs/common';
import { SdgsService } from './sdgs.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sdgs } from './entities/sdgs.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Sdgs])],
  providers: [SdgsService],
  exports: [SdgsService],
})
export class SdgsModule {}
