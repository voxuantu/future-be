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
  Put,
  FormField,
  UploadedFile,
} from "tsoa";
import { UsersService } from "../services";
import {
  ICreateUser,
  ISignJWT,
  IUpdateUserInfo,
} from "../dto/request/user.dto";
import * as jwt from "jsonwebtoken";
import { IGetUserAuthInfoRequest } from "../types/express";

@Tags("Users")
@Route("users")
export class UsersController extends Controller {
  @Post()
  public async createUser(@Body() dto: ICreateUser) {
    return UsersService.create(dto);
  }

  @Post("/sign-jwt-token")
  public signJwtToken(@Body() dto: ISignJWT) {
    return jwt.sign(
      { userId: dto.userId, role: [dto.role] },
      process.env.JWT_SECRET || ""
    );
  }

  @Security("jwt", ["user"])
  @Get("/addresses")
  public async getMyAddresses(@Request() request: IGetUserAuthInfoRequest) {
    return UsersService.getMyAddresses(request.user.userId);
  }

  @Security("jwt", ["user"])
  @Get()
  public getUser(@Request() request: IGetUserAuthInfoRequest) {
    return UsersService.getUser(request.user.userId);
  }

  @Get("/{userId}")
  public findUserById(@Path() userId: string) {
    return UsersService.findUserById(userId);
  }

  @Get("/{userId}/wish-list")
  public wishlist(@Path() userId: string) {
    return UsersService.wishlistProduct(userId);
  }
  @Get("/{userId}/cart")
  public getCart(@Path() userId: string) {
    return UsersService.getCart(userId);
  }
  @Security("jwt", ["user"])
  @Put("/setting")
  public updateInfo(
    @Request() request: IGetUserAuthInfoRequest,
    @FormField("name") name?: string,
    @FormField("email") email?: string,
    @FormField("birthday") birthday?: string,
    @UploadedFile("avatar")
    avatar?: Express.Multer.File
  ) {
    const dto: IUpdateUserInfo = {
      name,
      email,
      birthday,
      avatar,
    };
    return UsersService.updateInfo(request.user.userId, dto);
  }
}
