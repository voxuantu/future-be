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
  Delete,
} from "tsoa";
import { UsersService } from "../services";
import { ICreateUser, ISignJWT } from "../dto/request/user.dto";
import * as jwt from "jsonwebtoken";
import { IGetUserAuthInfoRequest } from "../types/express";
import { WishlistService } from "../services/wishlist.service";

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
  @Get("/wishlist")
  public getWishlist(@Request() request: IGetUserAuthInfoRequest) {
    return UsersService.getWishlistProduct(request.user.userId);
  }

  @Get("/{userId}")
  public findUserById(@Path() userId: string) {
    return UsersService.findUserById(userId);
  }

  @Security("jwt", ["user"])
  @Post("/wishlist/{productId}")
  public async insertWishlistItem(
    @Request() request: IGetUserAuthInfoRequest,
    @Path() productId: string
  ) {
    return WishlistService.insert(request.user.userId, productId);
  }

  @Security("jwt", ["user"])
  @Delete("/wishlist/{productId}")
  public async deleteWishlistItem(
    @Request() request: IGetUserAuthInfoRequest,
    @Path() productId: string
  ) {
    return WishlistService.delete(request.user.userId, productId);
  }
}
