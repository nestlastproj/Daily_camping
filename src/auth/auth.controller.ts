import {
  BadRequestException,
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
import { User } from 'src/entity/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService, private readonly userService: UserService) {}

  // render
  // --------------------------------------------------------------------
  @Get('/isLoggined')
  @UseGuards(JwtAuthGuard)
  async isLoggined(@Req() req) {
    return await this.authService.isLoggined(req);
  }

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
    return res.render('mypageeditprofile.ejs', { id });
  }

  // --------------------------------------------------------------------

  @Post('/emailSend')
  async emailSend(@Body(ValidationPipe) emailval: string, @Res({ passthrough: true }) res: Response) {
    const { number } = await this.authService.emailSend(emailval);
    res.cookie('authNum', number, { path: '/', expires: new Date(Date.now() + 300000) });
  }

  @Post('/userValidate')
  @UseGuards(JwtAuthGuard)
  async userValidate(@Req() req, @Body() passwordval: string) {
    return await this.authService.userValidate(req, passwordval);
  }

  @Get('/me')
  @UseGuards(JwtAuthGuard)
  async getinfo(@Req() req) {
    return await this.authService.getinfo(req);
  }

  @Put('/emailLogOff')
  @UseGuards(JwtAuthGuard)
  async emailLogOff(@Req() req) {
    return await this.authService.emailLogOff(req);
  }

  @Delete('/logOff')
  @UseGuards(JwtAuthGuard)
  async remove(@Req() req) {
    await this.authService.remove(req);
  }

  @Put('/edit')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  async editprofile(@Req() req, @Body() data: UpdateUserDto, @UploadedFile() file: Express.MulterS3.File) {
    return await this.userService.editprofile(req, data, file);
  }

  @Post('/signup')
  async signUp(@Body(ValidationPipe) createUserDto: CreateUserDto, @Res({ passthrough: true }) res: Response) {
    return await this.authService.signup(createUserDto, res);
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Req() req, @Res({ passthrough: true }) res: Response) {
    const user = req.user;

    const { accessToken } = this.authService.getCookieWithJwtAccessToken(user.id, user.nickname);
    const { refreshToken } = this.authService.getCookieWithJwtRefreshToken(user.id, user.nickname);

    await this.userService.setCurrentRefreshToken(refreshToken, user.id);

    res.cookie('Authentication', accessToken);
    res.cookie('Refresh', refreshToken);

    return user;
  }

  @UseGuards(JwtRefreshGuard)
  @Post('/logout')
  async logOut(@Req() req, @Res({ passthrough: true }) res: Response) {
    const Option = this.authService.getCookiesForLogOut();

    await this.userService.removeRefreshToken(req.user.id);

    res.cookie('Authentication', Option);
    res.cookie('Refresh', Option);
  }

  @UseGuards(JwtRefreshGuard)
  @Get('refresh')
  refresh(@Req() req, @Res({ passthrough: true }) res: Response) {
    const user = req.user;
    const { accessToken, ...accessOption } = this.authService.getCookieWithJwtAccessToken(user.id, user.nickname);
    const { refreshToken, ...refreshOption } = this.authService.getCookieWithJwtRefreshToken(user.id, user.nickname);
    res.cookie('Authentication', accessToken, accessOption);
    res.cookie('Refresh', refreshToken, refreshOption);

    return user;
  }

  @Get()
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get('/:id')
  findOne(@Param() id: number): Promise<User> {
    return this.userService.findOne(id);
  }
}
