import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { UserService } from './user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super();
  }

  // 인증 성공 후
  async validate(payload) {
    const { email } = payload;
    const user = await this.userService.findByUser({ email });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
