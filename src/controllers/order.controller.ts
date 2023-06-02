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
  Put,
} from "tsoa";
import { OrderService } from "../services/order.service";
import { ICreateOrder } from "../dto/request";
import { IGetUserAuthInfoRequest } from "../types/express";
import { OrderStatus } from "../constances/enum";
import { IUpdateStatus } from "../dto/response/order.dto";

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

  @Get("/pagination")
  public async getAllOrders(
    @Query("limit") limit: number,
    @Query("page") page: number
  ) {
    return OrderService.getAllOrders(limit, page);
  }
  @Get("/order-follow-date/pagination")
  public async getOrdersFollowDate(
    @Query("limit") limit: number,
    @Query("page") page: number
  ) {
    return OrderService.getOrdersFollowDate(limit, page);
  }
  @Put("/update-status")
  public async updateStatusOrder(
    @Query("order-id") orderId: string,
    @Query("status") status: OrderStatus
  ) {
    return OrderService.updateStatusOrder(orderId, status);
  }
}
