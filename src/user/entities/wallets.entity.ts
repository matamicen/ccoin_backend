import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Users } from './users.entity';
import { ApiProperty } from '@nestjs/swagger';

export enum UserBlockchain {
  ALGORAND = 'algorand',
  POLYGON = 'polygon',
}

@Entity()
export class Wallets {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @ApiProperty()
  @Column('text')
  // @Column({
  //   type: 'enum',
  //   enum: UserBlockchain,
  //   default: UserBlockchain.ALGORAND,
  // })
  blockchain: UserBlockchain;

  @ApiProperty()
  @Column({ unique: true })
  address: string;

  @ApiProperty()
  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @ApiProperty()
  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;

  @ManyToOne(() => Users, (users) => users.wallets)
  @JoinColumn()
  user: Users;
}
