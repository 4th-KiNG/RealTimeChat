import {
  Body,
  Controller,
  Get,
  Head,
  Header,
  Post,
  UseGuards,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "./auth.dto";
import { UserService } from "src/user/user.service";
import { JwtGaurd } from "src/guards/jwt.guard";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("signup")
  @Header("Content-Type", "application/json")
  SignUp(@Body() dto: CreateUserDto) {
    return this.authService.signUp(dto);
  }

  @Post("signin")
  @Header("Content-Type", "application/json")
  SignIn(@Body() dto: Omit<CreateUserDto, "name">) {
    return this.authService.signIn(dto);
  }
}
