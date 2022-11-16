import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    // super();
    super({
      passReqToCallback: true,
    });
  }

  async validate(req: any, username: string, password: string): Promise<any> {
    console.log('Matias1');
    console.log(username);
    console.log(password);
    // console.log(req.body.otro);
    const user = await this.authService.validateUser(
      username,
      password,
      req.body.wallet,
      req.body.tx,
    );
    console.log(user);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
