import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// Refresh Token이 유효한지 확인
@Injectable()
export class JwtRefreshGuard extends AuthGuard('jwt-refresh-token') {}
