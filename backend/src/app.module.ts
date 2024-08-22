import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./user/user.module";
import { User } from "./user/user.entity";
import { JwtModule } from "@nestjs/jwt";
import { ChatModule } from "./chat/chat.module";
import { Chat } from "./chat/chat.entity";
import { MessageModule } from "./message/message.module";
import { Message } from "./message/message.entity";
import { MessagesGateway } from "./messages/messages.gateway";
import { NestjsFormDataModule } from "nestjs-form-data";
import { MinioModule } from './minio/minio.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [User, Chat, Message],
      synchronize: true,
    }),
    JwtModule.register({}),
    AuthModule,
    UserModule,
    ChatModule,
    MessageModule,
    MinioModule,
  ],
  controllers: [],
  providers: [MessagesGateway],
})
export class AppModule {}
