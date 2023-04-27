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
import {
  ICallBackZaloPay,
  ICreateOrder,
  IQueryZaloPayOrderStatus,
} from "../dto/request";
import { IGetUserAuthInfoRequest } from "../types/express";
import { OrderStatus } from "../constances/enum";
import { ICreateMAC } from "../dto/response/order.dto";

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

  @Get("/pay-with-zalopay")
  public async payWithZalopay() {
    return OrderService.createPaymentZaloPayURL();
  }

  @Post("/callback-zalo-pay")
  public async callbackZaloPay(@Body() dto: ICallBackZaloPay) {
    return OrderService.callbackZaloPay(dto);
  }

  @Post("/query-zalopay-order-status")
  public async queryZalopayOrderStatus(@Body() dto: IQueryZaloPayOrderStatus) {
    return OrderService.queryZalopayOrderStatus(dto.app_trans_id);
  }
}
