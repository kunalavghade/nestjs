import { Body, Controller, Post } from '@nestjs/common';
import { UserDTO } from './user.dto';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post('/signup')
  createUser(@Body() user: UserDTO) {
    this.userService.save(user.email, user.password);
  }
}
