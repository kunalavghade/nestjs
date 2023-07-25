import { Injectable } from '@nestjs/common/decorators';
import { MessagesRepository } from './messages.repository';

@Injectable()
export class MessagesServices {
  constructor(private messagesRepos: MessagesRepository) {}

  async findOne(id: string) {
    return this.messagesRepos.findOne(id);
  }

  async findAll() {
    return this.messagesRepos.findAll();
  }

  async save(content: string) {
    return this.messagesRepos.save(content);
  }
}
