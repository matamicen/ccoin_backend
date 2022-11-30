import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Tokens {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  // We think this field is not necessary to valid a tx in algorand
  // @ApiProperty()
  // @Column({ nullable: true })
  // public_key: string;

  @ApiProperty()
  @Column()
  address: string;

  @ApiProperty()
  @Column()
  challenge: string;

  @ApiProperty()
  @Column({ type: 'timestamptz', nullable: true })
  login_date: Date;

  @ApiProperty()
  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @ApiProperty()
  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;
}
