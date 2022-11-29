import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Sdgs } from '../../sdgs/entities/sdgs.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Projects {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @ApiProperty()
  @Column()
  title: string;

  @ApiProperty()
  @Column()
  description: string;

  @ApiProperty()
  @Column({ unique: true })
  serial: string;

  @ApiProperty()
  @ManyToMany(() => Sdgs, (sdgs) => sdgs.projects)
  @JoinTable({
    name: 'projects_sdgs',
    joinColumn: {
      name: 'project_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'sdgd_id',
      referencedColumnName: 'id',
    },
  })
  sdgs: Sdgs[];

  @ApiProperty()
  @Column()
  project_url: string;

  @ApiProperty()
  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @ApiProperty()
  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;
}
