import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from '../../user/user.service';

// JwtRefreshStrategy 가드에 대한 전략 작성
@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh-token') {
  constructor(private readonly userService: UserService, private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request) => {
          return request?.cookies?.Refresh;
        },
      ]),
      secretOrKey: process.env.JWT_REFRESH_TOKEN_SECRET || configService.get('JWT_REFRESH_TOKEN_SECRET'),
      passReqToCallback: true,
    });
  }
  // 해당 Refresh Token이 유효한지 확인하고 유효한 경우 유저 정보를 반환
  async validate(req, payload) {
    const refreshToken = req.cookies?.Refresh;
    return this.userService.getUserIfRefreshTokenMatches(refreshToken, payload.id, payload.nickname);
  }
}
