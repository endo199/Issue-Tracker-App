import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

import { Comment } from '../model/comment';

@Injectable()
export class CommentPipe implements PipeTransform<any, Comment> {
  transform(value: any, metadata: ArgumentMetadata) {
    return Object.assign({}, new Comment(), value);
  }
}
