import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Projects } from '../../projects/entity/projects.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Sdgs {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @ApiProperty()
  @Column({ unique: true })
  goal: number;

  @ApiProperty()
  @Column()
  description: string;

  @ApiProperty()
  @Column()
  image_url: string;

  @ApiProperty()
  @ManyToMany(() => Projects, (projects) => projects.sdgs)
  projects: Projects[];

  @ApiProperty()
  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @ApiProperty()
  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;
}
