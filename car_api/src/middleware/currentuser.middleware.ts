import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { Session } from 'express-session';
import { User } from 'src/users/entity/user.entity';
import { UsersService } from 'src/users/users.service';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      currentUser?: User;
    }
  }
}

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(private userService: UsersService) {}
  async use(
    req: Request & { session?: Session & { userId?: number } },
    res: Response,
    next: NextFunction,
  ) {
    const { userId } = req.session || { userId: 1 };
    if (userId) {
      const user = await this.userService.findOne(userId);
      req.currentUser = user;
    }
    next();
  }
}
