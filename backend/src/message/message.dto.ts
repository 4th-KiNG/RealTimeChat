import { IsDate, IsString, Length } from "class-validator";

export class createMessageDto {
  @IsString()
  ownerId: string;

  @IsString()
  @Length(1, 100)
  content: string;

  @IsString()
  chatId: string;
}
