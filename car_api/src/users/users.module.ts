import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserProviders } from './repo/user.provider';
import { DatabaseModule } from 'src/database/database.module';
import { AuthService } from './auth/auth.service';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [...UserProviders, UsersService, AuthService],
})
export class UsersModule {}
