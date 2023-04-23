// src/users/usersController.ts
import {
  Body,
  Controller,
  Get,
  Post,
  Route,
  Security,
  Request,
  Path,
  Tags,
} from "tsoa";
import { UsersService } from "../services";
import { ICreateUser } from "../dto/request/user.dto";
import * as jwt from "jsonwebtoken";
import { IGetUserAuthInfoRequest } from "../types/express";

@Tags("Users")
@Route("users")
export class UsersController extends Controller {
  @Security("jwt", ["admin"])
  @Get()
  public async getTest(
    @Request() request: IGetUserAuthInfoRequest
  ): Promise<string> {
    console.log("request: ", request.user);
    return "test";
  }

  @Post()
  public async createUser(@Body() dto: ICreateUser) {
    return UsersService.create(dto);
  }

  @Get("/sign-jwt-token")
  public signJwtToken() {
    return jwt.sign(
      { userId: "6428e46887f2e8e51a172d85", role: ["admin"] },
      process.env.JWT_SECRET || ""
    );
  }

  @Get("/{userId}")
  public findUserById(@Path() userId: string) {
    return UsersService.findUserById(userId);
  }

  @Get("/{userId}/wish-list")
  public wishlist(@Path() userId: string) {
    return UsersService.wishlistProduct(userId);
  }
}
