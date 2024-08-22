import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Message } from "./message.entity";
import { Repository } from "typeorm";
import { createMessageDto } from "./message.dto";

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
  ) {}

  async createMessage(createMessageDto: createMessageDto) {
    const message = new Message();
    message.ownerId = createMessageDto.ownerId;
    message.content = createMessageDto.content;
    message.createDate = new Date().toLocaleString();
    message.chatId = createMessageDto.chatId;
    return await this.messageRepository.save(message);
  }

  async getMessagesFromChat(chatId: string) {
    return await this.messageRepository.find({
      where: { chatId: chatId },
      order: { createDate: "ASC" },
    });
  }

  async deleteMessage(messageId: string) {
    await this.messageRepository.delete(messageId);
    return "OK";
  }

  async deleteMessagesFromChat(chatId: string) {
    await this.messageRepository.delete({ chatId: chatId });
    return "OK";
  }
}
