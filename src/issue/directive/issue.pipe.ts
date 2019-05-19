import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { Issue } from '../model/issue';

@Injectable()
export class IssuePipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    return Object.assign({}, new Issue(), value);
  }
}
