import { IsEmail, IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class UpdateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  name: string;

  @IsString()
  phone: string;

  @IsString()
  @MaxLength(20)
  nickname: string;
}
