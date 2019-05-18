import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  
  constructor(private authService: AuthService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.validateRequest(request);
  }

  validateRequest(request): boolean | Promise<boolean> | Observable<boolean> {
    const authorization = request.headers.authorization as string;
    const auth: string[] = authorization.split(' ');
    const pairOfUsernamePassword = this.decodeBase64ToString(auth[1]).split(':');
    
    return this.authService.isExist(pairOfUsernamePassword[0], pairOfUsernamePassword[1]);
  }

  decodeBase64ToString(encodedString: string): string {
    // const buffer = new Buffer(encodedString, 'base64');
    const buffer = Buffer.from(encodedString, 'base64');
    return buffer.toString('ascii');
  }

  
}
