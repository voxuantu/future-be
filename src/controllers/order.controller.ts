import {
  Body,
  Controller,
  Request,
  Post,
  Route,
  Security,
  Tags,
  Get,
  Query,
} from "tsoa";
import { OrderService } from "../services/order.service";
import { ICreateOrder } from "../dto/request";
import { IGetUserAuthInfoRequest } from "../types/express";
import { OrderStatus } from "../constances/enum";

@Tags("Orders")
@Route("orders")
export class OrdersController extends Controller {
  @Security("jwt", ["user"])
  @Post()
  public async createOrder(
    @Body() body: ICreateOrder,
    @Request() request: IGetUserAuthInfoRequest
  ) {
    return OrderService.createOrder(body, request.user.userId);
  }

  @Security("jwt", ["user"])
  @Get("/history")
  public async getOrderHistoryfollowStatus(
    @Query("status") status: OrderStatus,
    @Request() request: IGetUserAuthInfoRequest
  ) {
    return OrderService.getOrderHistoryFollowStatus(
      request.user.userId,
      status
    );
  }
}
