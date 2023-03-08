import { PickType } from '@nestjs/mapped-types';
import { IsNumber } from 'class-validator';
import { CreateCommentDto } from './create-comment.dto';

export class DeleteCommentDto extends CreateCommentDto {}
