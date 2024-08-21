import { IsBoolean, IsString } from "class-validator";

export class CreateChatDto {
  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsBoolean()
  private: boolean;

  password?: string;
}

export class DeleteChatDto {
  @IsString()
  id: string;

  @IsString()
  chatId: string;
}

export class MoveUserDto {
  @IsString()
  id: string;

  @IsString()
  chatId: string;

  @IsString()
  userId: string;
}
