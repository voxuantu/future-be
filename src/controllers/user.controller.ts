// src/users/usersController.ts
import { Body, Controller, Get, Post, Route } from "tsoa";
import { UsersService } from "../services";
import { ICreateUser } from "../dto/request/user.dto";

@Route("users")
export class UsersController extends Controller {
  @Get()
  public async getTest(): Promise<string> {
    return "test";
  }

  @Post()
  public async createUser(@Body() dto: ICreateUser) {
    return UsersService.create(dto);
  }
}
