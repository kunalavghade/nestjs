import { MiddlewareConsumer, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserProviders } from './repo/user.provider';
import { DatabaseModule } from 'src/database/database.module';
import { AuthService } from './auth/auth.service';
// import { CurrentUserIntercepter } from './intecepter/curr.user.intercepter';
// import { APP_INTERCEPTOR } from '@nestjs/core';
import { CurrentUserMiddleware } from 'src/middleware/currentuser.middleware';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [
    ...UserProviders,
    UsersService,
    AuthService,
    /*{
      // to apply intercepter globaly
      provide: APP_INTERCEPTOR,
      useClass: CurrentUserIntercepter,
    },*/
  ],
})
export class UsersModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CurrentUserMiddleware).forRoutes('*');
  }
}
