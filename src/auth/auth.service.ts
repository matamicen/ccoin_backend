import { ConsoleLogger, Injectable } from '@nestjs/common';
import { UserService } from '../user/users.service';
import { JwtService } from '@nestjs/jwt';
import algosdk, { Transaction, SignedTransaction } from 'algosdk';
import { TokensService } from 'src/tokens/tokens.service';
import { Tokens } from '../tokens/entities/tokens.entity';
// import nacl from 'tweetnacl';
import * as nacl from 'tweetnacl';

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
    // if user has signIn with Wallet
    if (wallet) {
      console.log('Signed tx from API in base64');
      console.log(tx);
      const {
        publicKeyTxn,
        signature,
        publicKeyB64,
        address,
        note,
        txn_bytes,
      } = this.decodeTx(tx);

      const { challenge_check, nowDate, isValidDate } =
        await this.token_validation(note, address, publicKeyB64);

      if (!isValidDate) return null;
      challenge_check.login_date = nowDate;

      const validTxn = this.validate_algorand_tx_siganture(
        txn_bytes,
        signature,
        publicKeyTxn,
      );

      if (validTxn) {
        await this.tokensService.update(challenge_check);
        const user = await this.userService.findByAddress(
          challenge_check.address,
        );
        if (user) {
          const { password, ...result } = user;
          // @ts-ignore: Unreachable code error 
          result.address = challenge_check.address;
          return result;
        } else {
          const user = { public_address: challenge_check.address };
          const createdUser = await this.userService.create(user);
          // @ts-ignore: Unreachable code error 
          createdUser.address = challenge_check.address;
          return createdUser;
        }
      }
    } else {
      // user login without wallet (is not applicable for a web3 site)
      const user = await this.userService.findByemail(username);
      if (user && user.password === pass) {
        const { password, ...result } = user;
        return result;
      }
    }
    return null;
  }

  validate_algorand_tx_siganture = (
    txn_bytes,
    signature,
    publicKeyTxn,
  ): boolean => {
    const msg_bytes = new Uint8Array(txn_bytes.length + 2);
    msg_bytes.set(Buffer.from("TX"));
    msg_bytes.set(txn_bytes, 2);
    // @ts-ignore: Unreachable code error
    const validTxn: boolean = nacl.sign.detached.verify(
      msg_bytes,
      signature,
      publicKeyTxn,
    );
    return validTxn;
  };

  token_validation = async (
    note,
    address,
    publicKeyB64,
  ): Promise<{
    challenge_check: Tokens;
    nowDate: Date;
    isValidDate: boolean;
  }> => {
    const challenge_check = await this.tokensService.findByChallenge(note);
    if (challenge_check === undefined) return null;
    if (challenge_check.address !== address) return null;
    // We need to check the public_key? I think with the address is enough.
    // if (challenge_check.public_key !== publicKeyB64) return null;
    const tokenDateTime = new Date(challenge_check.created_at).getTime() / 1000;
    const nowDate = new Date();
    const nowDateTime = nowDate.getTime() / 1000;
    // the user has 300 seconds to sign the Tx in order to signIn (this is to avoid the user sends an older presigned tx with an older challenge)
    const isValidDate = nowDateTime - tokenDateTime <= 300;
    return { challenge_check, nowDate, isValidDate };
  };

  decodeTx = (
    tx: any,
  ): {
    publicKeyTxn: Uint8Array;
    signature: Uint8Array;
    publicKeyB64: string;
    address: string;
    note: string;
    txn_bytes: Uint8Array;
  } => {
    // @ts-ignore: Unreachable code error 
    const decoded0 = algosdk.decodeSignedTransaction(Buffer.from(Object.values(tx.blob)));
    const publicKeyTxn = decoded0.txn.from.publicKey;
    const signature = new Uint8Array(decoded0.sig);
    const publicKeyB64 = Buffer.from(publicKeyTxn).toString('base64');
    const address = algosdk.encodeAddress(publicKeyTxn);
    const txn_bytes = algosdk.encodeObj(decoded0.txn.get_obj_for_encoding());
    const txnNote = decoded0.txn.note;
    const note = new TextDecoder().decode(txnNote);
    return {
      publicKeyTxn: publicKeyTxn,
      signature: signature,
      publicKeyB64: publicKeyB64,
      address: address,
      note: note,
      txn_bytes: txn_bytes,
    };
  };

  async login(user: any) {
    const payload = {
      id: user.id,
      email: user.email,
      address: user.address,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
