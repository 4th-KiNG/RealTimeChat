import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common";
import { ChatService } from "./chat.service";
import { CreateChatDto, DeleteChatDto, MoveUserDto } from "./chat.dto";
import { JwtGaurd } from "src/guards/jwt.guard";

@Controller("chat")
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get()
  @UseGuards(JwtGaurd)
  GetAllChats() {
    return this.chatService.getChats();
  }

  @Post()
  @UseGuards(JwtGaurd)
  CreateChat(@Body() createChatDto: CreateChatDto) {
    return this.chatService.createChat(createChatDto);
  }

  @Delete()
  @UseGuards(JwtGaurd)
  DeleteChat(@Body() deleteChatDto: DeleteChatDto) {
    return this.chatService.deleteChat(deleteChatDto.id, deleteChatDto.chatId);
  }

  @Patch("users")
  @UseGuards(JwtGaurd)
  AddUserInChat(@Body() addUserDto: MoveUserDto) {
    return this.chatService.addUserInChat(addUserDto.chatId, addUserDto.userId);
  }

  @Delete("users")
  @UseGuards(JwtGaurd)
  DeleteUserFromChat(@Body() deleteUserDto: MoveUserDto) {
    return this.chatService.deleteUserFromChat(
      deleteUserDto.chatId,
      deleteUserDto.userId,
    );
  }
}
