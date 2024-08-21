import { IsArray, IsBoolean, IsString } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Chat {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  @IsString()
  ownerId: string;

  @Column("text", { default: [], array: true })
  usersId: string[];

  @Column()
  @IsString()
  name: string;

  @Column()
  @IsBoolean()
  isPrivate: boolean;

  @Column({ nullable: true })
  @IsString()
  passwordHash: string;
}
