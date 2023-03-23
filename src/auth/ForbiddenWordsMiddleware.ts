import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class ForbiddenWordsMiddleware implements NestMiddleware {
  private readonly forbiddenWords = ['바보', '멍청이'];

  use(req: Request, res: Response, next: () => void) {
    const body = req.body;
    if (body) {
      for (const word of this.forbiddenWords) {
        if (body.includes(word)) {
          throw new Error(`Forbidden word ${word} found`);
        }
      }
    }
    next();
  }
}
