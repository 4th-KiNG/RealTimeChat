import { UseGuards } from "@nestjs/common";
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { JwtGaurd } from "src/guards/jwt.guard";
import { createMessageDto, deleteMessageDto } from "src/message/message.dto";
import { MessageService } from "src/message/message.service";

@WebSocketGateway({ cors: true })
export class MessagesGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly messageService: MessageService) {}

  @SubscribeMessage("sendMessage")
  async createMessage(@MessageBody() createMessageDto: createMessageDto) {
    const message = await this.messageService.createMessage(createMessageDto);

    this.server
      .to(`${createMessageDto.chatId}`)
      .emit("receiveMessage", message);
  }

  @SubscribeMessage("deleteMessage")
  async deleteMessage(@MessageBody() deleteMessageDto: deleteMessageDto) {
    await this.messageService.deleteMessage(deleteMessageDto.messageId);
    this.server
      .to(`${deleteMessageDto.chatId}`)
      .emit("updateMessages", deleteMessageDto.messageId);
  }

  @SubscribeMessage("joinChat")
  joinChat(@MessageBody() chatId: string, @ConnectedSocket() client: Socket) {
    client.join(`${chatId}`);
  }
}
