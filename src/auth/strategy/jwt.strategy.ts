import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import * as config from 'config';
import { UserService } from 'src/user/user.service';

// JWT 검증
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private userService: UserService) {
    super({
      secretOrKey: process.env.JWT_ACCESS_TOKEN_SECRET || config.get('JWT_ACCESS_TOKEN_SECRET'),
      // JWT 추출 방법을 제공
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
    return this.userService.getById(payload.id);
  }
}
