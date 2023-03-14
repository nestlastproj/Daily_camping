import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { Response } from 'express';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { UserService } from 'src/user/user.service';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';

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

  @Get('/edit')
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

  @Get('/mypage/get')
  @UseGuards(JwtAuthGuard)
  async getinfo(@Req() req) {
    return await this.userService.getinfo(req);
  }

  @Put('/edit')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  async editprofile(@Req() req, @Body() data: UpdateUserDto, @UploadedFile() file: Express.Multer.File) {
    return await this.userService.editprofile(req, data, file);
  }

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
