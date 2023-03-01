import { Body, Controller, Post, UseGuards, ValidationPipe } from '@nestjs/common';
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
  login(@Body(ValidationPipe) loginUserDto: LoginUserDto): Promise<{ accessToken: string }> {
    return this.userService.login(loginUserDto);
  }
}
