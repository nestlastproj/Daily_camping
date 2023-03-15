// import { Injectable } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';
// import { UsersService } from '../users/users.service';
// import { IAuthServiceGetAccessToken, IAuthServiceSetRefreshToken } from './interfaces/auth-service.interface';

// @Injectable()
// export class AuthService {
//   constructor(private readonly usersService: UsersService) {}

//   async OAuthLogin({ req, res }) {
//     // 1. 회원조회
//     let user = await this.usersService.findOne({ email: req.user.email }); //user를 찾아서

//     // 2, 회원가입이 안되어있다면? 자동회원가입
//     if (!user) user = await this.usersService.create({ ...req.user }); //user가 없으면 하나 만들고, 있으면 이 if문에 들어오지 않을거기때문에 이러나 저러나 user는 존재하는게 됨.

//     // 3. 회원가입이 되어있다면? 로그인(AT, RT를 생성해서 브라우저에 전송)한다
//     this.setRefreshToken({ user, res });
//     res.redirect('리다이렉트할 url주소');
//   }
// }

// // auth.controller.ts

// import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport';
// import { Request, Response } from 'express';
// import { UsersService } from '../users/users.service';
// import { AuthService } from './auth.service';

// interface IOAuthUser {
//   user: {
//     name: string;
//     email: string;
//     password: string;
//   };
// }

// @Controller()
// export class AuthController {
//   constructor(
//     private readonly usersService: UsersService, //
//     private readonly authService: AuthService,
//   ) {}

//   //-----------------------구글 로그인-----------------------------//
//   @Get('/login/google')
//   @UseGuards(AuthGuard('google'))
//   async loginGoogle(
//     @Req() req: Request & IOAuthUser, //
//     @Res() res: Response,
//   ) {
//     this.authService.OAuthLogin({ req, res });
//   }

//   //-----------------------카카오 로그인-----------------------------//
//   @Get('/login/kakao')
//   @UseGuards(AuthGuard('kakao'))
//   async loginKakao(
//     @Req() req: Request & IOAuthUser, //
//     @Res() res: Response,
//   ) {
//     this.authService.OAuthLogin({ req, res });
//   }

//   //-----------------------네이버 로그인-----------------------------//
//   @Get('/login/naver')
//   @UseGuards(AuthGuard('naver'))
//   async loginNaver(
//     @Req() req: Request & IOAuthUser, //
//     @Res() res: Response,
//   ) {
//     this.authService.OAuthLogin({ req, res });
//   }

//   @Get('favicon.ico')
//   favicon(
//     @Req() req: Request & IOAuthUser, //
//     @Res() res: Response,
//   ) {
//     res.status(204).end();
//   }
// }
