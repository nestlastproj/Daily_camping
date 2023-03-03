import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import _ from 'lodash';

@Injectable()
export class commentService {
  deleteComment(commentId: number): void {
    throw new Error('Method not implemented.');
  }
  private comment = [
    {
      id: 1,
      title: '첫번째 게시글 작성',
      content: 'ddddd',
      nickname: 'nilee23',
      createAT: '2023-02-27 11:11:11',
    },
    {
      id: 2,
      title: '두번째 게시글 작성',
      content: 'ddddd',
      nickname: 'nilee23',
      createAT: '2023-02-27 11:11:11',
    },
    {
      id: 3,
      title: '세번째 게시글 작성',
      content: 'ddddd',
      nickname: 'nilee23',
      createAT: '2023-02-27 11:11:11',
    },
  ];

  private commentPassword = new Map();

  getComment() {
    return this.comment;
  }

  getCommentById(id: number) {
    return this.comment.find((comment) => {
      return comment.id === id;
    });
  }

  createComment(title: string, nickname: string, content: string, createAT: string) {
    const commentId = this.comment.length + 1;
    this.comment.push({ id: commentId, title, content, nickname, createAT });
    return commentId;
  }

  updateComment(id: number, title: string, content: string, createAT: string) {
    const comment = this.getCommentById(id);
    if (_.isNil(comment)) {
      throw new NotFoundException(`comment not found. id: ${id}`);
    }
    comment.title = title;
    comment.content = content;
  }

  deletecomment(id: number) {
    this.comment = this.comment.filter((comment) => comment.id !== id);
  }
}
