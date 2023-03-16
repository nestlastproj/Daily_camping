import {
  Body,
  Controller,
  Delete,
  Get,
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
import { User } from 'src/entity/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService, private readonly userService: UserService) {}
  // render
  // --------------------------------------------------------------------

  // 마이페이지 내 정보 불러오기
  @Get('/mypage')
  @UseGuards(JwtAuthGuard)
  getmypage(@Req() req, @Res() res: Response) {
    const { id, nickname } = req.user;
    return res.render('mypage.ejs', { id, nickname });
  }

  // 마이페이지 회원 정보 수정
  @Get('/edit')
  @UseGuards(JwtAuthGuard)
  editpage(@Req() req, @Res() res: Response) {
    const id = req.user.id;
    return res.render('mypageeditprofile.ejs', { id });
  }

  // 실시간 채팅방
  @Get('chat')
  @UseGuards(JwtAuthGuard)
  getChat(@Req() req, @Res() res: Response) {
    const nickname = req.user.nickname;
    return res.render('chat.ejs', { nickname });
  }

  // 로그인
  @Get('login')
  getLogin(@Res() res: Response) {
    return res.render('login.ejs');
  }

  // 마이페이지 회원 탈퇴
  @Get('withdrawal')
  getdelete(@Res() res: Response) {
    return res.render('mypagewithdrawal.ejs');
  }

  // --------------------------------------------------------------------
  // 상단바 로그인, 로그아웃 버튼
  @Get('/isLoggined')
  @UseGuards(JwtAuthGuard)
  isLoggined(@Req() req) {
    const user = req.user;
    return user;
  }

  // 모든 회원정보 불러오기
  @Get('alluser')
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  // 내 정보 불러오기
  @Get('/mypage/get')
  @UseGuards(JwtAuthGuard)
  async getinfo(@Req() req) {
    return await this.userService.getinfo(req);
  }

  // 마이페이지 수정
  @Put('/edit')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  async editprofile(@Req() req, @Body() data: UpdateUserDto, @UploadedFile() file: Express.Multer.File) {
    return await this.userService.editprofile(req, data, file);
  }

  // 회원 탈퇴
  @Delete('/logoff')
  @UseGuards(JwtAuthGuard)
  async remove(@Req() req) {
    await this.userService.remove(req);
  }

  // 회원가입
  @Post('/signup')
  signUp(@Body(ValidationPipe) createUserDto: CreateUserDto): Promise<void> {
    return this.authService.signup(createUserDto);
  }

  // 로그인
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

  // 로그아웃
  @UseGuards(JwtRefreshGuard)
  @Post('/logout')
  async logOut(@Req() req, @Res({ passthrough: true }) res: Response) {
    const { accessOption, refreshOption } = this.authService.getCookiesForLogOut();

    await this.userService.removeRefreshToken(req.user.id);

    res.cookie('Authentication', '', accessOption);
    res.cookie('Refresh', '', refreshOption);
  }

  // Token 발급
  @UseGuards(JwtRefreshGuard)
  @Get('refresh')
  refresh(@Req() req, @Res({ passthrough: true }) res: Response) {
    const user = req.user;
    const { accessToken, ...accessOption } = this.authService.getCookieWithJwtAccessToken(user.id, user.nickname);
    res.cookie('Authentication', accessToken, accessOption);
    return user;
  }
}
