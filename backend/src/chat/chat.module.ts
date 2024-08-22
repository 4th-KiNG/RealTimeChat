import { Module } from "@nestjs/common";
import { ChatService } from "./chat.service";
import { ChatController } from "./chat.controller";
import { JwtModule } from "@nestjs/jwt";
import { Chat } from "./chat.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MessageService } from "src/message/message.service";
import { Message } from "src/message/message.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Chat, Message]), JwtModule],
  controllers: [ChatController],
  providers: [ChatService, MessageService],
})
export class ChatModule {}
