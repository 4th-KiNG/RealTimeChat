import { IsEmail, IsString, Length, IsPhoneNumber } from "class-validator";

export class CreateUserDto {
  @IsEmail(
    {},
    {
      message: "Некорректная почта",
    },
  )
  email: string;

  @IsString({
    message: "Имя должно быть строкой",
  })
  @Length(4, 15, {
    message: "Имя должно быть от 4 до 15 символов",
  })
  name: string;

  @IsString()
  password: string;
}
