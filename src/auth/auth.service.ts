import { ConsoleLogger, Injectable } from '@nestjs/common';
import { UserService } from '../user/users.service';
import { JwtService } from '@nestjs/jwt';
import algosdk, { Transaction, SignedTransaction } from 'algosdk';
import { TokensService } from 'src/tokens/tokens.service';
// import nacl from 'tweetnacl';
import * as nacl from 'tweetnacl';
import { resourceUsage } from 'process';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private tokensService: TokensService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    username: string,
    pass: string,
    wallet: boolean,
    tx: any,
  ): Promise<any> {
    console.log('wallet: ' + wallet);
    console.log('tx');
    console.log(tx);
    // if user has signIn with Wallet
    if (wallet) {
      console.log('Signed tx from API in base64');
      console.log(tx);
      // @ts-ignore: Unreachable code error 
      const decoded0 = algosdk.decodeSignedTransaction(Buffer.from(Object.values(tx.blob)));
      console.log('decodedSignedTransaction0');
      console.log(decoded0);
      console.log(decoded0.txn.get_obj_for_encoding());
      const publicKeyTxn = decoded0.txn.from.publicKey;
      const signature = new Uint8Array(decoded0.sig);
      const publicKeyB64 = Buffer.from(publicKeyTxn).toString('base64');
      const address = algosdk.encodeAddress(publicKeyTxn);
      // const address = algosdk.decodeAddress(address).publicKey
      const txn_bytes = algosdk.encodeObj(decoded0.txn.get_obj_for_encoding());
      const txnNote = decoded0.txn.note;
      const note = new TextDecoder().decode(txnNote);
      console.log('note');
      console.log(note);
      const challenge_check = await this.tokensService.findByChallenge(note);
      if (challenge_check === undefined) return null;
      console.log('challenge_check');
      console.log(challenge_check);
      // address = address + '0';
      // publicKeyB64 = publicKeyB64 + 'o'
      if (challenge_check.address !== address) return null;
      if (challenge_check.public_key !== publicKeyB64) return null;
      const tokenDateTime = new Date(challenge_check.created_at).getTime() / 1000;
      const nowDate = new Date();
      const nowDateTime = nowDate.getTime() / 1000;
      console.log('nowDate - tokenDate');
      console.log(nowDateTime - tokenDateTime);
      // the user has 300 secinds to sign the Tx in order to signIn (this is to avoid the user sends an older presigned tx with an older challenge)
      const isValidDate = nowDateTime - tokenDateTime <= 300;
      if (!isValidDate) return false;
      challenge_check.login_date = nowDate;
      // const txn_bytes = algosdk.encodeObj(manual_encoding);
      const msg_bytes = new Uint8Array(txn_bytes.length + 2);
      msg_bytes.set(Buffer.from("TX"));
      msg_bytes.set(txn_bytes, 2);
      console.log('msg_bytes');
      console.log(msg_bytes);
      // @ts-ignore: Unreachable code error
      const validTxn = nacl.sign.detached.verify(
        msg_bytes,
        signature,
        publicKeyTxn,
      );
      console.log('nacl');
      console.log(validTxn);
      if (validTxn) {
        const update_token = await this.tokensService.update(challenge_check);
        const user = await this.userService.findByAddress(
          challenge_check.address,
        );
        if (user) {
          console.log('existia usuario');
          const { password, ...result } = user;
          console.log('result1');
          // result.email = 'manuel@gmail.com';
          console.log(result);
          return result;
        } else {
          console.log('usuario nuevo');
          const user = { public_address: challenge_check.address };
          const createdUser = this.userService.create(user);
          // const { password, ...result } = createdUser;
          return createdUser;
        }
      }
    } else {
      // user login without wallet (is not applicable for a web3 site)
      const user = await this.userService.findByemail(username);
      if (user && user.password === pass) {
        const { password, ...result } = user;
        console.log('result2');
        console.log(result);
        return result;
      }
    }
    return null;
  }


  async login(user: any) {
    const payload = {
      id: user.id,
      email: user.email,
      address: user.public_address,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
