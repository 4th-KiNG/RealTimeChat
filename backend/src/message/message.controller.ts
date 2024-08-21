import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Query,
  UseGuards,
} from "@nestjs/common";
import { MessageService } from "./message.service";
import { createMessageDto } from "./message.dto";
import { JwtGaurd } from "src/guards/jwt.guard";

@Controller("message")
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post()
  CreateMessage(@Body() createMessageDto: createMessageDto) {
    return this.messageService.createMessage(createMessageDto);
  }

  @Get()
  @UseGuards(JwtGaurd)
  GetMessages(@Query("chatId") chatId: string) {
    return this.messageService.getMessagesFromChat(chatId);
  }

  @Delete()
  DeleteMessage(@Query("messageId") messageId: string) {
    return this.messageService.deleteMessage(messageId);
  }
}
