import { Body, Controller, Delete, Get, Param, Post, Put, Req, Res, UseGuards, ValidationPipe } from '@nestjs/common';
import { Response } from 'express';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { UserService } from 'src/user/user.service';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService, private readonly userService: UserService) {}
  // render
  // --------------------------------------------------------------------
  @Get('/mypage')
  @UseGuards(JwtAuthGuard)
  getmypage(@Req() req, @Res() res: Response) {
    const { id, nickname } = req.user;
    return res.render('mypage.ejs', { id, nickname });
  }

  @Get('/mypageedit')
  @UseGuards(JwtAuthGuard)
  editpage(@Req() req, @Res() res: Response) {
    const id = req.user.id;
    return res.render('edit_profile.ejs', { id });
  }

  @Get('chat')
  @UseGuards(JwtAuthGuard)
  getChat(@Req() req, @Res() res: Response) {
    const nickname = req.user.nickname;
    return res.render('chat.ejs', { nickname });
  }

  @Get('login')
  getLogin(@Res() res: Response) {
    return res.render('login.ejs');
  }
  // --------------------------------------------------------------------

  @Get('/mypage/:id')
  async getinfo(@Param('id') id: number) {
    return await this.userService.getinfo(id);
  }

  @Put('/edit/:id')
  async editprofile(@Param() id: number, @Body() data: UpdateUserDto) {
    return await this.userService.editprofile(id, data);
  }

  // @Delete('/logoff/:id')
  // async deleteuser(@Param() id: number) {

  // }

  @Post('/signup')
  signUp(@Body(ValidationPipe) createUserDto: CreateUserDto): Promise<void> {
    return this.authService.signup(createUserDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Req() req, @Res({ passthrough: true }) res: Response) {
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
