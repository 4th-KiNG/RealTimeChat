import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Chat } from "./chat.entity";
import { Repository } from "typeorm";
import { CreateChatDto } from "./chat.dto";
import * as bcrypt from "bcrypt";
import { MessageService } from "src/message/message.service";

@Injectable()
export class ChatService {
  constructor(
    private readonly messageService: MessageService,
    @InjectRepository(Chat)
    private readonly chatRepository: Repository<Chat>,
  ) {}

  async getChats() {
    return await this.chatRepository.find();
  }

  async createChat(createChatDto: CreateChatDto) {
    const newChat = new Chat();
    newChat.ownerId = createChatDto.id;
    newChat.name = createChatDto.name;
    newChat.isPrivate = createChatDto.private;
    if (createChatDto.private) {
      newChat.passwordHash = await bcrypt.hash(createChatDto.password, 5);
    }
    newChat.usersId = [createChatDto.id];
    await this.chatRepository.save(newChat);
    return "OK";
  }

  async deleteChat(ownerId: string, chatId: string) {
    const chat = await this.chatRepository.findOneBy({ id: chatId });
    if (!chat) throw new HttpException("Чат не найден", HttpStatus.NOT_FOUND);
    if (ownerId !== chat.ownerId) {
      throw new HttpException("Не удалось удалить чат", HttpStatus.BAD_REQUEST);
    }
    await this.chatRepository.delete(chatId);
    this.messageService.deleteMessagesFromChat(chatId);
    return "OK";
  }

  async addUserInChat(chatId: string, userId: string) {
    const chat = await this.chatRepository.findOneBy({ id: chatId });
    if (chat.usersId.includes(userId)) {
      throw new HttpException(
        "Пользователь уже состоит в данном чате",
        HttpStatus.BAD_REQUEST,
      );
    }
    chat.usersId.push(userId);
    return await this.chatRepository.save(chat);
  }

  async deleteUserFromChat(chatId: string, userId: string) {
    const chat = await this.chatRepository.findOneBy({ id: chatId });
    chat.usersId = chat.usersId.filter((id) => id !== userId);
    return await this.chatRepository.save(chat);
  }
}
