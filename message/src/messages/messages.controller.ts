import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { CreateMessageDTO } from './dto/create-message-dto';
import { MessagesServices } from './messages.services';

@Controller('messages')
export class MessagesController {
  constructor(private messageService: MessagesServices) {}

  @Get()
  listMessages() {
    return this.messageService.findAll();
  }

  @Get('/:id')
  async getMessage(@Param('id') id: string) {
    const message = await this.messageService.findOne(id);
    if (!message) {
      throw new NotFoundException('message Not Found');
    }
    return message;
  }

  @Post()
  addMessage(@Body() body: CreateMessageDTO) {
    console.log('Called Post');
    return this.messageService.save(body.content);
  }
}
