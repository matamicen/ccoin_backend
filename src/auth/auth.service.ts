import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import algosdk, { Transaction } from 'algosdk';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    username: string,
    pass: string,
    wallet: boolean,
    tx: Transaction,
  ): Promise<any> {
    console.log('wallet: ' + wallet);
    if (wallet) {
      console.log('vino por wallet');
      console.log('tx:');
      console.log(tx);
      // const decodedSignedTransaction = algosdk.decodeSignedTransaction(
      //   Buffer.from(Object.values(tx)),
      // );
      console.log('tx2:');
      const decodedSignedTransaction = algosdk.decodeSignedTransaction(
        Buffer.from(tx.toString(), 'base64'),
      );
      console.log(decodedSignedTransaction);
      const publicKeyTxn = decodedSignedTransaction.txn.to.publicKey;
      console.log(publicKeyTxn);
      const publicKeyB64 = Buffer.from(publicKeyTxn).toString('base64');
      console.log(publicKeyB64);
      const signature = Buffer.from(decodedSignedTransaction.sig);
      console.log('signature');
      console.log(signature);
      const rawTxnBytes = decodedSignedTransaction.txn.bytesToSign();
      console.log('rawTxnBytes');
      console.log(rawTxnBytes);
      const txnNote = decodedSignedTransaction.txn.note;
      const note = new TextDecoder().decode(txnNote);
      console.log('note:');
      console.log(note);
      // const challenge = note.split("\n")[1]
      const user = await this.userService.findByemail(username);
      if (user && user.password === pass) {
        const { password, ...result } = user;
        return result;
      }
    } else {
      const user = await this.userService.findByemail(username);
      if (user && user.password === pass) {
        const { password, ...result } = user;
        return result;
      }
    }
    return null;
  }

  async login(user: any) {
    const payload = { id: user.id, email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
