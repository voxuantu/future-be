// src/users/usersController.ts
import {
  Body,
  Controller,
  Get,
  Path,
  Post,
  Query,
  Route,
  SuccessResponse,
} from "tsoa";
import { User } from "../schemas/user";
import { UsersService, UserCreationParams } from "../services";

@Route("users")
export class UsersController extends Controller {
  @Get()
  public async getTest(): Promise<string> {
    return "test";
  }
  @Get("{userId}")
  public async getUser(
    @Path() userId: number,
    @Query() name?: string
  ): Promise<User> {
    return new UsersService().get(userId, name);
  }
}
