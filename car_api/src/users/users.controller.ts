import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Patch,
  Delete,
  Query,
  Session,
} from '@nestjs/common';
import { ResUserDTO, UserDTO, updateUserDTO } from './dto/user.dto';
import { UsersService } from './users.service';
import { Serializer } from 'src/intercepter/serialize.intercepter';
import { AuthService } from './auth/auth.service';
import { CurrentUser } from './decorators/curr.user.decorator';
import { User } from './entity/user.entity';

@Controller('auth')
@Serializer(ResUserDTO)
export class UsersController {
  constructor(
    private userService: UsersService,
    private authService: AuthService,
  ) {}

  @Get('/my_id')
  async agetMe(@CurrentUser() user: User) {
    console.log(user);
    return user;
  }

  @Post('/signout')
  async signOut(@Session() session: any) {
    session.userId = null;
  }

  @Post('/signup')
  async singup(@Body() user: UserDTO, @Session() session: any) {
    const userdb = await this.authService.signup(user.email, user.password);
    session.userId = userdb.id;
    return user;
  }

  @Post('/signin')
  async signin(@Body() user: UserDTO, @Session() session: any) {
    const userdb = await this.authService.signin(user.email, user.password);
    session.userId = userdb.id;
    return user;
  }

  @Get('/:id')
  async getUser(@Param('id') id: number) {
    return this.userService.findOne(id);
  }

  @Get()
  async getUserByEmail(@Query('email') email: string) {
    return this.userService.findByEmail(email);
  }

  @Patch('/:id')
  async updateUser(@Param('id') id: number, @Body() user: updateUserDTO) {
    return this.userService.update(id, user);
  }

  @Delete('/:id')
  async remove(@Param('id') id: number) {
    return this.userService.remove(id);
  }
}
