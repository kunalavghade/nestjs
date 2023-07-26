import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepo: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userRepo.find();
  }

  async save(email: string, password: string) {
    const user = await this.userRepo.create();
    user.email = email;
    user.password = password;
    return await this.userRepo.save(user);
  }

  async findOne(id: number) {
    return await this.userRepo.findOneBy({ id });
  }

  async findByEmail(email: string) {
    return await this.userRepo.findBy({ email });
  }

  async update(id: number, attrs: Partial<User>) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('User Not found');
    }
    Object.assign(user, attrs);
    return await this.userRepo.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return this.userRepo.remove(user);
  }
}
