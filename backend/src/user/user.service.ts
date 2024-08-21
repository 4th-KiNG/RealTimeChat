import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { Repository } from "typeorm";
import { CreateUserDto } from "src/auth/auth.dto";
import * as bcrypt from "bcrypt";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
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
    return await this.userRepository.findOneBy({ id: id });
  }

  async getByEmail(email: string) {
    return await this.userRepository.findOneBy({ email: email });
  }
}
