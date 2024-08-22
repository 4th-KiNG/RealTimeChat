import { IsEmail, IsString, Length } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true })
  @IsEmail(
    {},
    {
      message: "Некорректная почта",
    },
  )
  email: string;

  @Column()
  @IsString({
    message: "Имя должно быть строкой",
  })
  @Length(4, 15, {
    message: "Имя должно быть от 4 до 15 символов",
  })
  name: string;

  @Column("text", { nullable: true, array: true })
  chatsId: string[];

  @Column()
  passwordHash: string;
}
