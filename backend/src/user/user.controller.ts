import {
  Body,
  Controller,
  Get,
  Header,
  Param,
  Post,
  Query,
  Req,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { JwtGaurd } from "src/guards/jwt.guard";
import { FileInterceptor } from "@nestjs/platform-express";
import { Request, Response } from "express";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(JwtGaurd)
  GetUser(@Body() dto: { id: string }) {
    return this.userService.getById(dto.id);
  }

  @Get(":userId")
  @UseGuards(JwtGaurd)
  GetUserById(@Param("userId") userId: string) {
    return this.userService.getById(userId);
  }

  @Post("avatar")
  @UseGuards(JwtGaurd)
  @UseInterceptors(FileInterceptor("avatar"))
  ChangeAvatar(
    @UploadedFile() avatar: Express.Multer.File,
    @Body() dto: { id: string },
  ) {
    return this.userService.changeAvatar(dto.id, avatar);
  }

  @Get("avatar/:userId")
  @UseGuards(JwtGaurd)
  GetAvatar(@Param("userId") userId: string, @Res() res: Response) {
    return this.userService.getAvatar(userId, res);
  }
}
