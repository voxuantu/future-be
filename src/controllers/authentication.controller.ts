import { Body, Controller, Example, Post, Response, Route, Tags } from "tsoa";
import { AuthenticationService } from "../services/authentication.service";
import { ICreateUser, IEmailVerify } from "../dto/request";
import { UsersService } from "../services";
// import { UsersService } from "../services";
// import { Response as ExResponse, response } from "express";

@Tags("login")
@Route("authenticate")
export class AuthenticationController extends Controller {
  @Post("/login")
  public async loginUser(
    @Body() dto: Pick<ICreateUser, "username" | "password">
  ) {
    return AuthenticationService.login(dto);
  }
  @Post("/send-code-email")
  public async sendVerifyCode(@Body() dto: IEmailVerify) {
    return AuthenticationService.sendVerifyCode(dto);
  }
  @Post("/register")
  public async createUser(@Body() dto: ICreateUser) {
    return UsersService.create(dto);
  }
}
