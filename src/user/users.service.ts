import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './entities/users.entity';
import { Wallets, UserBlockchain } from './entities/wallets.entity';
import algosdk from 'algosdk';
import { randomBytes } from 'crypto';
import { ConfigService } from '@nestjs/config';
import { TokensService } from 'src/tokens/tokens.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users) private userRepo: Repository<Users>,
    @InjectRepository(Wallets) private walletRepo: Repository<Wallets>,
    private tokensSevice: TokensService,
    private readonly configService: ConfigService,
  ) {}

  async findAll(): Promise<Users[]> {
    return this.userRepo.find();
  }

  async findOne(id: number): Promise<Users> {
    return this.userRepo.findOne({
      where: {
        id: id,
      },
    });
  }

  async findByemail(email: string): Promise<Users | undefined> {
    return this.userRepo.findOne({
      where: {
        email: email,
      },
    });
  }

  // async findByAddress(address: string): Promise<Users | undefined> {
  //   return this.userRepo.findOne({
  //     where: {
  //       public_address: address,
  //     },
  //   });
  // }

  async findByAddress(address: string): Promise<Users | undefined> {
    try {
      const wallet = await this.walletRepo.findOne({
        where: {
          address: address,
        },
        relations: ['user'],
      });
      console.log('Matias1 wallet');
      console.log(wallet);
      return await this.findOne(wallet.user.id);
    } catch (e) {
      // The wallet doesn't exists
      return undefined;
    }
  }

  async create(body: any): Promise<Users> {
    console.log('crea usuario - imprimo body');
    const newUser = new Users();
    console.log(body);
    newUser.name = body.name;
    newUser.lastname = body.lastname;
    newUser.email = body.email;
    newUser.password = body.password;
    // newUser.public_address = body.public_address;
    const createdUser = await this.userRepo.save(newUser);
    // no public_address means that the user do the signup withow connecting the wallet
    if (!body.public_address) body.public_address = 'not assigned';
    const createdWallet = this.createWallet(
      body.public_address,
      createdUser,
      UserBlockchain.ALGORAND,
    );

    return createdWallet && createdUser;
  }

  async generateChallengeTx(address: string): Promise<any> {
    try {
      const publicKeyB64 = Buffer.from(
        algosdk.decodeAddress(address).publicKey,
      ).toString('base64');
      const challenge = randomBytes(16).toString('base64');
      console.log('challenge');
      console.log(challenge);
      console.log('publicKeyB64');
      console.log(publicKeyB64);

      // create a token entry
      const token_entry = await this.tokensSevice.create(
        publicKeyB64,
        challenge,
        address,
      );

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
      // amount: Number(0),
      const unsignedTx = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
        from: address,
        to: address,
        amount: 0,
        suggestedParams,
        note,
      });
      // return unsignedTx;
      // const tx2_encoded = algosdk.encodeObj(unsignedTx.get_obj_for_encoding());
      // const tx2_encoded_final = Buffer.from(tx2_encoded).toString('base64');
      // return tx2_encoded_final;
      console.log('unsigned tx challenge');
      console.log(unsignedTx);
      return algosdk.encodeUnsignedTransaction(unsignedTx);
    } catch (error) {
      console.log(error);
    }
  }

  async createWallet(
    address: string,
    user: Users,
    blockchain: UserBlockchain,
  ): Promise<Wallets> {
    console.log('viene bien1');
    const newWallet = new Wallets();
    console.log('viene bien2');
    newWallet.blockchain = blockchain;
    newWallet.address = address;
    newWallet.user = user;
    return this.walletRepo.save(newWallet);
  }
}
