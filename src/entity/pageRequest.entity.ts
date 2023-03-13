import { IsOptional, IsString } from 'class-validator';

export abstract class PageRequest {
  @IsString()
  @IsOptional()
  pageNo: number | 1;

  @IsString()
  @IsOptional()
  pageSize: number | 10;

  getOffset(): number {
    return (this.pageNo - 1) * this.pageSize;
  }

  getLimit(): number {
    return this.pageSize;
  }
}

export class ArticleSearchParam {
  private readonly atitle: string;
  private readonly acontent: string;
  private readonly acreatedAt: Date;

  constructor(title: string, content: string, createdAt: Date) {
    this.atitle = title;
    this.acontent = content;
    this.acreatedAt = createdAt;
  }

  get title(): string {
    return this.title;
  }

  get content(): string {
    return this.content;
  }

  get createdAt(): Date {
    return this.createdAt;
  }
}
