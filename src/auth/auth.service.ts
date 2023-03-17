import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../auth/dto/create-user.dto';
import { User } from '../entity/user.entity';
import * as bcrypt from 'bcryptjs';
import { ConfigService } from '@nestjs/config';
import { UserService } from 'src/user/user.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {}

  async validateUser(email: string, plainTextPassword: string) {
    try {
      const user = await this.userService.getByEmail(email);
      await this.userService.verifyPassword(plainTextPassword, user.password);
      return user;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  // 회원가입
  async signup(createUserDto: CreateUserDto) {
    const { email, name, password, phone, nickname } = createUserDto;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await this.userRepository.create({ email, name, password: hashedPassword, phone, nickname });
    const existedemail = await this.userRepository.findOneBy({ email });
    if (existedemail) {
      throw new Error('이미 존재하는 이메일입니다.');
    }
    const existednickname = await this.userRepository.findOneBy({ nickname });
    if (existednickname) {
      throw new Error('이미 존재하는 닉네임입니다.');
    }
    try {
      await this.userRepository.save(user);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('이미 존재하는 회원입니다.');
      } else {
        console.log(error);
        throw new InternalServerErrorException();
      }
    }
  }

  // Access Token 발급
  getCookieWithJwtAccessToken(id: number, nickname: string) {
    const payload = { id, nickname };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
      expiresIn: `${this.configService.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME')}`,
    });

    return {
      accessToken: token,
      domain: this.configService.get('DATABASE_HOST'),
      path: '/',
      httpOnly: true,
      maxAge: 1000 * 60 * 60,
    };
  }

  // Refresh Token 발급
  getCookieWithJwtRefreshToken(id: number, nickname: string) {
    const payload = { id, nickname };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
      expiresIn: `${this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME')}`,
    });

    return {
      refreshToken: token,
      domain: this.configService.get('DATABASE_HOST'),
      path: '/',
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 30,
    };
  }

  // 초기화된 쿠키의 옵션을 가져옴
  getCookiesForLogOut() {
    return {
      accessOption: {
        domain: this.configService.get('DATABASE_HOST'),
        path: '/',
        httpOnly: true,
        maxAge: 0,
      },
      refreshOption: {
        domain: this.configService.get('DATABASE_HOST'),
        path: '/',
        httpOnly: true,
        maxAge: 0,
      },
    };
  }
}
