import { IsString, MaxLength } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  name: string;

  @IsString()
  phone: string;

  @IsString()
  @MaxLength(20)
  nickname: string;
}
