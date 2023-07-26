import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from '../users.service';
import { promisify } from 'util';
import { scrypt as _scrypt, randomBytes } from 'crypto';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async signup(email: string, password: string) {
    // chech for email in use
    const users = await this.userService.findByEmail(email);
    if (users.length) {
      throw new BadRequestException('email in use');
    }
    // hash pass

    // 1. Generate key
    const key = randomBytes(8).toString('hex');
    // 2. Hash key and pass
    const hash = (await scrypt(password, key, 32)) as Buffer;
    //3. Join both
    const hashPass = key + '.' + hash.toString('hex');
    // create and save user
    const user = await this.userService.save(email, hashPass);
    return user;
  }

  async signin(email: string, password: string) {
    const [user] = await this.userService.findByEmail(email);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    const [key, storedHash] = user.password.split('.');
    const hash = (await scrypt(password, key, 32)) as Buffer;

    if (storedHash !== hash.toString('hex')) {
      throw new BadRequestException('bad password');
    }
    return user;
  }
}
