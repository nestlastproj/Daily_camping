import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';
import * as bcrypt from 'bcryptjs';
import { UpdateUserDto } from 'src/auth/dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

  // 모든 회원 정보 불러오기
  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  // 내 정보 불러오기
  findOne(id: number): Promise<User> {
    return this.userRepository.findOneBy({ id });
  }

  // 프로필 수정
  async editprofile(req, data: UpdateUserDto, file?: Express.Multer.File) {
    const userId = req.user.id;
    return await this.userRepository.update(userId, {
      name: data.name,
      phone: data.phone,
      nickname: data.nickname,
      email: data.email,
      image: file.filename,
    });
  }

  // 회원 탈퇴
  async remove(req) {
    const userId = req.user.id;
    await this.userRepository.findOne({ where: { id: userId } });
    await this.removeRefreshToken(req.user.id);
    return await this.userRepository.softDelete({ id: userId });
  }

  // 이메일 확인
  async getByEmail(email: string) {
    const user = this.userRepository.findOneBy({ email });
    if (user) {
      return user;
    } else {
      throw new UnauthorizedException('일치하는 이메일이 존재하지 않습니다.');
    }
  }

  // 토큰에 id, nickname 값 저장
  async getById(id: number, nickname: string) {
    const user = await this.userRepository.findOne({
      where: { id, nickname },
      select: ['id', 'nickname', 'currentHashedRefreshToken'],
    });
    if (user) {
      return user;
    }
    throw new UnauthorizedException();
  }

  // 본인 정보 불러오기
  async getinfo(req): Promise<User> {
    const userId = req.user.id;
    return await this.userRepository.findOne({ where: { id: userId } });
  }

  // 비밀번호 확인
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
