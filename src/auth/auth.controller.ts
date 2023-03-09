import { Body, Controller, Get, Param, Post, Req, Res, UseGuards, ValidationPipe } from '@nestjs/common';
import { Response } from 'express';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { UserService } from 'src/user/user.service';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { User } from 'src/entity/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService, private readonly userService: UserService) {}

  @Get('/mypage')
  @UseGuards(JwtAuthGuard)
  getmypage(@Req() req, @Res() res: Response) {
    const user = req.user.nickname;
    return res.render('mypage.ejs', { nickname: user });
  }

  // @Get('/mypage/:id')
  // async getMypageId(@Param('id') id: number) {
  //   return await this.authService.getMypageId(id);
  // }

  @Post('/signup')
  signUp(@Body(ValidationPipe) createUserDto: CreateUserDto): Promise<void> {
    return this.authService.signup(createUserDto);
  }

  @Get('chat')
  @UseGuards(JwtAuthGuard)
  getChat(@Req() req, @Res() res: Response) {
    const user = req.user.nickname;
    return res.render('chat.ejs', { nickname: user });
  }

  @Get('login')
  getLogin(@Res() res: Response) {
    return res.render('login.ejs');
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Body(ValidationPipe) loginUserDto: LoginUserDto, @Req() req, @Res({ passthrough: true }) res: Response) {
    // const user = await this.authService.login(loginUserDto);
    const user = req.user;
    const { accessToken, ...accessOption } = this.authService.getCookieWithJwtAccessToken(user.id, user.nickname);
    const { refreshToken, ...refreshOption } = this.authService.getCookieWithJwtRefreshToken(user.id, user.nickname);

    await this.userService.setCurrentRefreshToken(refreshToken, user.id);

    res.cookie('Authentication', accessToken, accessOption);
    res.cookie('Refresh', refreshToken, refreshOption);

    return user;
  }

  @UseGuards(JwtRefreshGuard)
  @Post('/logout')
  async logOut(@Req() req, @Res({ passthrough: true }) res: Response) {
    const { accessOption, refreshOption } = this.authService.getCookiesForLogOut();

    await this.userService.removeRefreshToken(req.user.id);

    res.cookie('Authentication', '', accessOption);
    res.cookie('Refresh', '', refreshOption);
  }

  @UseGuards(JwtRefreshGuard)
  @Get('refresh')
  refresh(@Req() req, @Res({ passthrough: true }) res: Response) {
    const user = req.user;
    const { accessToken, ...accessOption } = this.authService.getCookieWithJwtAccessToken(user.id, user.nickname);
    res.cookie('Authentication', accessToken, accessOption);
    return user;
  }
}
