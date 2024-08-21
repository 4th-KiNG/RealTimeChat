import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { Observable } from "rxjs";

@Injectable()
export class JwtGaurd implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req: Request = context.switchToHttp().getRequest();
    const token = req.headers.authorization;
    if (!token || token.split(" ")[0] != "Bearer") {
      throw new HttpException(
        "Не удалось авторизовать пользователя",
        HttpStatus.UNAUTHORIZED,
      );
    }
    try {
      const id = this.jwtService.verify(token.split(" ")[1], {
        secret: "auth",
      }).id;
      req.body.id = id;
      return true;
    } catch (e) {
      throw new HttpException(
        "Не удалось авторизовать пользователя",
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
