import { Body, Controller, Post, Req, Res, UseGuards, ValidationPipe } from '@nestjs/common';
import { Response } from 'express';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/signup')
  signUp(@Body(ValidationPipe) createUserDto: CreateUserDto): Promise<void> {
    return this.userService.signup(createUserDto);
  }

  @Post('/login')
  async login(@Body(ValidationPipe) loginUserDto: LoginUserDto, @Res() res: Response) {
    const user = await this.userService.login(loginUserDto);

    const cookieOptions = {
      httpOnly: true,
      // signed: true,
      maxAge: 60 * 60 * 1000, // 1시간
    };
    res.setHeader('Authorization', 'Bearer ' + user.accessToken);
    res.cookie('accesstoken', user.accessToken, cookieOptions);
    return res.json({
      message: '로그인 성공',
      user,
    });
  }
}
