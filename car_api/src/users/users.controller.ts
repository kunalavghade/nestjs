import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Patch,
  Delete,
  Query,
} from '@nestjs/common';
import { ResUserDTO, UserDTO, updateUserDTO } from './dto/user.dto';
import { UsersService } from './users.service';
import { Serializer } from 'src/intercepter/serialize.intercepter';
import { AuthService } from './auth/auth.service';

@Controller('auth')
@Serializer(ResUserDTO)
export class UsersController {
  constructor(
    private userService: UsersService,
    private authService: AuthService,
  ) {}

  @Post('/signup')
  async singup(@Body() user: UserDTO) {
    return await this.authService.signup(user.email, user.password);
  }

  @Post('/signin')
  async signin(@Body() user: UserDTO) {
    return await this.authService.signin(user.email, user.password);
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
