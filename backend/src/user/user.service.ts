import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { Repository } from "typeorm";
import { CreateUserDto } from "src/auth/auth.dto";
import * as bcrypt from "bcrypt";
import { MinioService } from "src/minio/minio.service";
import { Response } from "express";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly minioService: MinioService,
  ) {}

  async create(dto: CreateUserDto) {
    try {
      const newUser = new User();
      newUser.email = dto.email;
      newUser.name = dto.name;
      newUser.passwordHash = await bcrypt.hash(dto.password, 5);
      const user = await this.userRepository.save(newUser);
      return user;
    } catch (e) {
      throw new HttpException(
        "Не удалось зарегистрировать пользователя",
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getById(id: string) {
    return await this.userRepository.findOne({
      where: { id: id },
      select: ["id", "name", "email", "chatsId"],
    });
  }

  async getByEmail(email: string) {
    return await this.userRepository.findOneBy({ email: email });
  }

  async changeAvatar(id: string, avatar: Express.Multer.File) {
    return this.minioService.uploadAvatar(id, avatar.buffer);
  }

  async getAvatar(id: string, res: Response) {
    const avatarStream = await this.minioService.getAvatar(id);
    res.set({
      "Content-Type": "image/jpeg",
    });

    avatarStream.pipe(res);
  }
}
