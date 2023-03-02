import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
// 게시물을 작성할 때 로그인한 사용자만 작성 가능하게 제한
@Injectable()
export default class JwtAuthenticationGuard extends AuthGuard('jwt') {}
