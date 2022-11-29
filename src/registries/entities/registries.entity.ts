import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Projects } from '../../projects/entity/projects.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Registries {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column({ nullable: true })
  description: string;

  @ApiProperty()
  @Column()
  instructions: string;

  @ApiProperty()
  @OneToMany(() => Projects, (projects) => projects.registry)
  projects: Projects[];
}
