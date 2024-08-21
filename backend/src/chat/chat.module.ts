import { Module } from "@nestjs/common";
import { ChatService } from "./chat.service";
import { ChatController } from "./chat.controller";
import { JwtModule } from "@nestjs/jwt";
import { Chat } from "./chat.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([Chat]), JwtModule],
  controllers: [ChatController],
  providers: [ChatService],
})
export class ChatModule {}
