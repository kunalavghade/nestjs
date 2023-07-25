import { Module } from '@nestjs/common';
import { MessagesController } from './messages.controller';
import { MessagesRepository } from './messages.repository';
import { MessagesServices } from './messages.services';

@Module({
  controllers: [MessagesController],
  providers: [MessagesRepository, MessagesServices],
})
export class MessagesModule {}
