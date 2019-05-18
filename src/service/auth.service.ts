import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService {
    private usersAndPassword = {
        'user1': 'password'
    }
    isExist(username: string, password: string): boolean | Promise<boolean> | Observable<boolean> {
        console.log(`XXX cek ${username} dgn password ${password} exist ? ${this.usersAndPassword[username] && this.usersAndPassword[username] === password}`);
        return this.usersAndPassword[username] && this.usersAndPassword[username] === password;
    }
}
