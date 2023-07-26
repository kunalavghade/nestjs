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
import { ResUserDTO, UserDTO, updateUserDTO } from './user.dto';
import { UsersService } from './users.service';
import { Serializer } from 'src/intercepter/serialize.intercepter';

@Controller('auth')
@Serializer(ResUserDTO)
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post('/signup')
  createUser(@Body() user: UserDTO) {
    this.userService.save(user.email, user.password);
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
