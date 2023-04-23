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
      { userId: "6444a053801515f786434080", role: ["user"] },
      process.env.JWT_SECRET || ""
    );
  }

  @Security("jwt", ["user"])
  @Get("/addresses")
  public async getMyAddresses(@Request() request: IGetUserAuthInfoRequest) {
    return UsersService.getMyAddresses(request.user.userId);
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
