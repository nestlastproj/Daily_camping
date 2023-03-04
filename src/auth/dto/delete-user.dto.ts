import { PickType } from '@nestjs/mapped-types/dist';
import { CreateUserDto } from './create-user.dto';

export class DeleteArticleDto extends PickType(CreateUserDto, ['password'] as const) {}
