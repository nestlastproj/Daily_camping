import { PickType } from '@nestjs/mapped-types';
import { CreateArticleDto } from 'src/article/dto/create-article.dto';

export class CreateCommentDto extends PickType(CreateArticleDto, ['content'] as const) {}
