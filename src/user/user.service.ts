import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import algosdk from 'algosdk';
import { randomBytes } from 'crypto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private readonly configService: ConfigService,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepo.find();
  }

  async findOne(id: number): Promise<User> {
    return this.userRepo.findOne({
      where: {
        id: id,
      },
    });
  }

  async findByemail(email: string): Promise<User | undefined> {
    return this.userRepo.findOne({
      where: {
        email: email,
      },
    });
  }

  async create(body: any): Promise<User> {
    console.log('viene bien1');
    const newUser = new User();
    console.log('viene bien2');
    newUser.name = body.name;
    newUser.lastname = body.lastname;
    newUser.email = body.email;
    console.log('viene bien3');
    newUser.email2 = body.email2;
    newUser.password = body.password;
    return this.userRepo.save(newUser);
  }

  async generateChallengeTx(address: string): Promise<any> {
    try {
      const publicKeyB64 = Buffer.from(
        algosdk.decodeAddress(address).publicKey,
      ).toString('base64');
      const challenge = randomBytes(16).toString('base64');
      console.log(challenge);
      console.log('publicKeyB64');
      console.log(publicKeyB64);
      // const noteRaw = noteInstructions + '\n' + token.challenge
      // const note = enc.encode(noteRaw)
      const enc = new TextEncoder();
      const note = enc.encode(challenge);
      console.log('configservice');
      console.log(this.configService.get<string>('DATABASE_USER'));
      const algodClient = new algosdk.Algodv2(
        this.configService.get<string>('ALGO_API_TOKEN'),
        this.configService.get<string>('ALGO_HOST_URL'),
        this.configService.get<string>('ALGO_HOST_PORT'),
      );
      const suggestedParams = await algodClient.getTransactionParams().do();
      console.log(suggestedParams);
      const unsignedTx = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
        from: address,
        to: address,
        amount: Number(0),
        suggestedParams,
        note,
      });
      // return unsignedTx;
      // const tx2_encoded = algosdk.encodeObj(unsignedTx.get_obj_for_encoding());
      // const tx2_encoded_final = Buffer.from(tx2_encoded).toString('base64');
      // return tx2_encoded_final;
      return algosdk.encodeUnsignedTransaction(unsignedTx);
    } catch (error) {
      console.log(error);
    }
  }
}
