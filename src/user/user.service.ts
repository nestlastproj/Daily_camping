import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';
import * as bcrypt from 'bcryptjs';
import { UpdateUserDto } from 'src/auth/dto/update-user.dto';
import { ArticleService } from 'src/article/article.service';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>, private articleService: ArticleService) {}

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOne(id: number): Promise<User> {
    return this.userRepository.findOneBy({ id });
  }

  async editprofile(req, data: UpdateUserDto, file?: Express.MulterS3.File) {
    const userId = req.user.id;
    const { nickname } = data;

    const user = { name: data.name, phone: data.phone, nickname: data.nickname };
    if (file) {
      const filename = file.key;
      user['image'] = filename;
    }
    const mynickname = user.nickname;
    const existednickname = await this.userRepository.findOneBy({ nickname });
    if (nickname === mynickname) {
      return await this.userRepository.update(userId, user);
    } else {
      if (existednickname) {
        throw new ConflictException('이미 존재하는 닉네임입니다.');
      }
    }
  }

  async getByEmail(email: string) {
    const user = this.userRepository.findOneBy({ email });
    if (user) {
      return user;
    } else {
      throw new UnauthorizedException('일치하는 이메일이 존재하지 않습니다.');
    }
  }

  async getById(id: number, nickname: string) {
    const user = await this.userRepository.findOne({
      where: { id, nickname },
    });
    if (user) {
      return user;
    }
    throw new UnauthorizedException();
  }

  async verifyPassword(plainTextPassword: string, hashedPassword: string) {
    const isPasswordMatch = await bcrypt.compare(plainTextPassword, hashedPassword);
    if (!isPasswordMatch) {
      throw new UnauthorizedException('일치하는 비밀번호가 존재하지 않습니다.');
    }
  }

  // DB에 발급받은 Refresh Token을 암호화 하여 저장
  async setCurrentRefreshToken(refreshToken: string, id: number) {
    const currentHashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    await this.userRepository.update(id, { currentHashedRefreshToken });
  }

  // 유저의 고유 번호를 이용하여 데이터를 조회하고 Refresh Token이 유효한지 확인
  async getUserIfRefreshTokenMatches(refreshToken: string, id: number, nickname: string) {
    const user = await this.getById(id, nickname);
    const isRefreshTokenMatching = await bcrypt.compare(refreshToken, user.currentHashedRefreshToken);
    if (isRefreshTokenMatching) {
      return user;
    }
  }

  // 로그아웃 => 'Refresh Token의 값 =  Null'
  async removeRefreshToken(id: number) {
    return this.userRepository.update(id, {
      currentHashedRefreshToken: null,
    });
  }
}
