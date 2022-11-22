import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

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
  @Column({
    nullable: true,
  })
  public_address: string;
}
