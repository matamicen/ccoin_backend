import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tokens } from './entities/tokens.entity';

@Injectable()
export class TokensService {
  constructor(
    @InjectRepository(Tokens) private tokensRepo: Repository<Tokens>,
  ) {}

  async findAll(): Promise<Tokens[]> {
    return this.tokensRepo.find();
  }
  async findOne(id: number): Promise<Tokens> {
    return this.tokensRepo.findOne({
      where: {
        id: id,
      },
    });
  }

  async findByChallenge(challenge: string): Promise<Tokens> {
    return this.tokensRepo.findOne({
      where: {
        challenge: challenge,
      },
    });
  }

  async update(token: Tokens): Promise<Tokens> {
    return this.tokensRepo.save(token);
  }

  async create(
    public_key: string,
    challenge: string,
    address: string,
  ): Promise<Tokens> {
    console.log('viene bien1');
    const newToken = new Tokens();
    console.log('viene bien2');
    newToken.public_key = public_key;
    newToken.challenge = challenge;
    newToken.address = address;
    console.log('viene bien3');
    return this.tokensRepo.save(newToken);
  }
}
