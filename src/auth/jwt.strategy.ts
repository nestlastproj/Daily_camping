import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from '../entity/user.entity';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import * as config from 'config';

// JWT 검증
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      secretOrKey: process.env.JWT_SECRET || config.get('jwt.secret'),
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request) => {
          return request?.cookies?.Authorization;
        },
      ]),
      ignoreExpiration: true, // 토큰이 만료되더라도 바로 strategy 단에서 에러로 리턴하지 않도록 설정
    });
  }

  // 인증 성공 후
  async validate(payload) {
    const { email } = payload;
    const user = await this.userService.findByUser(email);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
