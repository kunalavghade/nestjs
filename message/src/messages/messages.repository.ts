import { Injectable } from '@nestjs/common';
import { writeFile, readFile } from 'fs/promises';

@Injectable()
export class MessagesRepository {
  async findOne(id: string) {
    const contents = await readFile('messages.json', 'utf8');
    const msgs = JSON.parse(contents);
    return msgs[id];
  }

  async findAll() {
    const contents = await readFile('messages.json', 'utf8');
    const msgs = JSON.parse(contents);
    return msgs;
  }

  async save(content: string) {
    const contents = await readFile('messages.json', 'utf8');
    const msgs = JSON.parse(contents);
    const id = Math.floor(Math.random() * 999);
    msgs[id] = { id, content };
    await writeFile('messages.json', JSON.stringify(msgs));
    return msgs[id];
  }
}
