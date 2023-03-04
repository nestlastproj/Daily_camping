import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOne(id: number): Promise<User | undefined> {
    return this.userRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }

  async getByEmail(email: string) {
    const user = this.userRepository.findOneBy({ email });
    if (user) {
      return user;
    } else {
      throw new UnauthorizedException('일치하는 이메일이 존재하지 않습니다.');
    }
  }

  async getById(id: number) {
    const user = await this.userRepository.findOneBy({ id });
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
  async getUserIfRefreshTokenMatches(refreshToken: string, id: number) {
    const user = await this.getById(id);

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
