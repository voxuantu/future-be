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
  Put,
} from "tsoa";
import { UsersService } from "../services";
import {
  AddToCart,
  ICreateUser,
  ISignJWT,
  UpdateQuantity,
} from "../dto/request/user.dto";
import * as jwt from "jsonwebtoken";
import { IGetUserAuthInfoRequest } from "../types/express";

@Tags("Users")
@Route("users")
export class UsersController extends Controller {
  @Security("jwt", ["user"])
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
  @Get("/cart")
  public getCart(@Request() request: IGetUserAuthInfoRequest) {
    return UsersService.getCart(request.user.userId);
  }

  @Get("/{userId}")
  public findUserById(@Path() userId: string) {
    return UsersService.findUserById(userId);
  }

  @Get("/{userId}/wish-list")
  public wishlist(@Path() userId: string) {
    return UsersService.wishlistProduct(userId);
  }

  @Security("jwt", ["user"])
  @Post("/cart")
  public addToCart(
    @Body() body: AddToCart,
    @Request() request: IGetUserAuthInfoRequest
  ) {
    return UsersService.addToCart(body, request.user.userId);
  }

  @Security("jwt", ["user"])
  @Delete("/cart/{productId}")
  public deleteCart(
    @Path() productId: string,
    @Request() request: IGetUserAuthInfoRequest
  ) {
    return UsersService.deleteCart(productId, request.user.userId);
  }

  @Security("jwt", ["user"])
  @Put("/cart/{productId}")
  public updateQuantity(
    @Path() productId: string,
    @Body() body: UpdateQuantity,
    @Request() request: IGetUserAuthInfoRequest
  ) {
    return UsersService.updateQuantity(
      productId,
      request.user.userId,
      body.action
    );
  }
}
