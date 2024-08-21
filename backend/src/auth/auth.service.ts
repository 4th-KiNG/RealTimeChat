import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UserService } from "src/user/user.service";
import { CreateUserDto } from "./auth.dto";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(dto: CreateUserDto) {
    const user = await this.userService.create(dto);
    const token = await this.jwtService.signAsync(
      { id: user.id },
      {
        expiresIn: "2h",
        secret: "auth",
      },
    );
    return JSON.stringify({
      jwt: token,
      status: "OK",
    });
  }

  async signIn(dto: Omit<CreateUserDto, "name">) {
    const user = await this.userService.getByEmail(dto.email);
    if (!user)
      throw new HttpException("Пользователь не найден", HttpStatus.NOT_FOUND);
    if (!bcrypt.compareSync(dto.password, user.passwordHash))
      throw new HttpException("Неверный пароль", HttpStatus.NOT_FOUND);
    const token = await this.jwtService.signAsync(
      { id: user.id },
      {
        expiresIn: "2h",
        secret: "auth",
      },
    );
    return JSON.stringify({
      jwt: token,
      status: "OK",
    });
  }
}
