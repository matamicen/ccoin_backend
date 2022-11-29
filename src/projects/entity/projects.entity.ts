import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  ManyToOne,
  JoinTable,
  JoinColumn,
} from 'typeorm';
import { Sdgs } from '../../sdgs/entities/sdgs.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Registries } from 'src/registries/entities/registries.entity';

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
  @Column({ nullable: true })
  thumbnail: string;

  @ApiProperty()
  @Column({ nullable: true })
  cover: string;

  @ApiProperty()
  @Column({ type: 'timestamptz', nullable: true })
  project_registration: string;

  @ApiProperty()
  @Column({ type: 'timestamptz', nullable: true })
  credit_start: string;

  @ApiProperty()
  @Column({ type: 'timestamptz', nullable: true })
  credit_end: string;

  @ApiProperty()
  @Column({ nullable: true })
  credits_minted: number;

  @ApiProperty()
  @Column({ nullable: true })
  credits_burned: number;

  @ApiProperty()
  @Column({ nullable: true })
  credits_remaining: number;

  @ApiProperty()
  @Column()
  project_url: string;

  @ApiProperty()
  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @ApiProperty()
  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;

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

  @ManyToOne(() => Registries, (registries) => registries.projects)
  @JoinColumn()
  registry: Registries;
}
