import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import _ from 'lodash';

@Injectable()
export class commentService {
  deleteComment(commentId: number, password: number): void {
    throw new Error('Method not implemented.');
  }
  private comment = [
    {
      id: 1,
      title: '첫번째 게시글 작성',
      content: 'ddddd',
    },
    {
      id: 2,
      title: '첫번째 게시글 작성',
      content: 'ddddd',
    },
    {
      id: 3,
      title: '첫번째 게시글 작성',
      content: 'ddddd',
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

  createComment(title: string, content: string, password: number) {
    const commentId = this.comment.length + 1;
    this.comment.push({ id: commentId, title, content });
    this.commentPassword.set(commentId, password);
    return commentId;
  }

  updateComment(id: number, title: string, content: string, password: number) {
    if (this.commentPassword.get(id) !== password) {
      throw new UnauthorizedException(`comment password is not correct. id: ${id}`);
    }

    const comment = this.getCommentById(id);
    if (_.isNil(comment)) {
      throw new NotFoundException(`comment not found. id: ${id}`);
    }

    comment.title = title;
    comment.content = content;
  }

  deletecomment(id: number, password: number) {
    if (this.commentPassword.get(id) !== password) {
      throw new UnauthorizedException(`comment password is not correct. id: ${id}`);
    }
    this.comment = this.comment.filter((comment) => comment.id !== id);
  }
}
