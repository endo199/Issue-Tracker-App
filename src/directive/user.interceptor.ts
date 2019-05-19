import { CallHandler, ExecutionContext, Injectable, NestInterceptor, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Utils } from '../util/utils';

@Injectable()
export class UserInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    try {
      const user = Utils.extractUsernameFromAuthHeader(context.switchToHttp().getRequest().headers.authorization);
      context.switchToHttp().getRequest().body['author'] = user.username;
    } catch(error) {
      throw new UnauthorizedException('You must provide authentication');
    }

    return next.handle();
  }
}
