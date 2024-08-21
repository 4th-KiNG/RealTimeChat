import { Body, Controller, Get, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { JwtGaurd } from "src/guards/jwt.guard";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(JwtGaurd)
  GetUser(@Body() dto: { id: string }) {
    return this.userService.getById(dto.id);
  }
}
