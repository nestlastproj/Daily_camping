// // auth.controller.ts

// import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport';
// import { Request, Response } from 'express';
// import { UsersService } from '../users/users.service';
// import { AuthService } from './auth.service';

// interface IOAuthUser {
//   //interface 설정
//   user: {
//     name: string;
//     email: string;
//     password: string;
//   };
// }

// @Controller() //컨트롤러 데코레이터
// export class AuthController {
//   //클래스이름
//   constructor(
//     //컨스트럭터로 초기값설정
//     private readonly usersService: UsersService, //DI 해주기
//     private readonly authService: AuthService,
//   ) {}

//   //-----------------------구글 로그인-----------------------------//
//   @Get('/login/google') //restAPI만들기. 엔드포인트는 /login/google.
//   @UseGuards(AuthGuard('google')) //인증과정을 거쳐야하기때문에 UseGuards를 써주고 passport인증으로 AuthGuard를 써준다. 이름은 google로
//   async loginGoogle(
//     @Req() req: Request & IOAuthUser,
//     @Res() res: Response, //Nest.js가 express를 기반으로 하기때문에 Request는 express에서 import한다.
//   ) {
//     //프로필을 받아온 다음, 로그인 처리해야하는 곳(auth.service.ts에서 선언해준다)
//     this.authService.OAuthLogin({ req, res });
//   }
// }
