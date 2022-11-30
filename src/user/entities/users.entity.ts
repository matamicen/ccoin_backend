import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Wallets } from './wallets.entity';

@Entity()
export class Users {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @ApiProperty()
  @Column({
    nullable: true,
  })
  name: string;

  @ApiProperty()
  @Column({
    nullable: true,
  })
  lastname: string;

  @ApiProperty()
  @Column({
    nullable: true,
  })
  email: string;

  @ApiProperty()
  @Column({
    nullable: true,
  })
  password: string;

  @ApiProperty()
  @OneToMany(() => Wallets, (wallets) => wallets.user)
  wallets: Wallets[];

  // @ApiProperty()
  // @Column({
  //   nullable: true,
  // })
  // public_address: string;

  @ApiProperty()
  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @ApiProperty()
  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;
}
