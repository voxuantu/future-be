import {
  CREATE_ORDER_SUCCESS,
  ERROR_CREATE_ORDER,
  ERROR_GET_ORDER_HISTORY,
  ERROR_PRODUCT_NOT_FOUND,
  ERROR_USER_NOT_FOUND,
  GET_ORDER_HISTORY_SUCCESS,
} from "../constances";
import { HttpStatus, OrderStatus } from "../constances/enum";
import { ICreateOrder } from "../dto/request";
import { IOrderHistoryRes } from "../dto/response/order.dto";
import Order, { IOrderModel } from "../models/order";
import OrderItem, { IOrderItemModel } from "../models/order-item";
import Product from "../models/product";
import User from "../models/user";
import { handleResFailure, handlerResSuccess } from "../utils/handle-response";
import { generateOrderId } from "../utils/random-string";

export class OrderService {
  static async createOrder(dto: ICreateOrder, userId: string) {
    try {
      const user = await User.findById(userId);
      if (!user) {
        return handleResFailure(ERROR_USER_NOT_FOUND, HttpStatus.NOT_FOUND);
      }

      const orderItems: string[] = [];
      for (let i = 0; i < dto.orderItems.length; i++) {
        const orderItem = dto.orderItems[i];
        const product = await Product.findByIdAndUpdate(orderItem.product, {
          $inc: {
            quantity: -orderItem.quantity,
          },
        });

        if (!product) {
          return handleResFailure(
            ERROR_PRODUCT_NOT_FOUND,
            HttpStatus.NOT_FOUND
          );
        }

        const newOrderItem = new OrderItem({
          product: orderItem.product,
          price: orderItem.price,
          quantity: orderItem.quantity,
        });
        await newOrderItem.save();

        orderItems.push(newOrderItem.id);
      }

      const totalPrice = dto.orderItems.reduce(
        (total, orderItem) => total + orderItem.price * orderItem.quantity,
        0
      );

      const newOrder = new Order({
        orderItems: orderItems,
        user: userId,
        total: totalPrice,
        address: dto.address,
        shortId: generateOrderId(),
      });
      await newOrder.save();

      return handlerResSuccess<string>(CREATE_ORDER_SUCCESS, "");
    } catch (error) {
      return handleResFailure(ERROR_CREATE_ORDER, HttpStatus.BAD_REQUEST);
    }
  }

  static async getOrderHistoryFollowStatus(
    userId: string,
    orderStatus: OrderStatus
  ) {
    try {
      const userFound = await User.findById(userId);
      if (!userFound) {
        return handleResFailure(ERROR_USER_NOT_FOUND, HttpStatus.NOT_FOUND);
      }

      const ordersHistoryRes: IOrderHistoryRes[] = [];
      const orders = await Order.find({
        user: userId,
        status: orderStatus,
      })
        .populate("orderItems")
        .sort({ createdAt: -1 });
      for (let i = 0; i < orders.length; i++) {
        const order = orders[i];
        const firstProd = await Product.findById(
          (order.orderItems[0] as IOrderItemModel).product
        );
        if (!firstProd) {
          return handleResFailure(
            ERROR_PRODUCT_NOT_FOUND,
            HttpStatus.NOT_FOUND
          );
        }

        ordersHistoryRes.push({
          _id: order.id,
          shortId: order.shortId,
          createdAt: order.createdAt as string,
          total: order.total,
          firstProduct: {
            _id: firstProd.id,
            thumbnail: firstProd.thumbnail,
            name: firstProd.name,
            price: (order.orderItems[0] as IOrderItemModel).price,
            quantity: (order.orderItems[0] as IOrderItemModel).quantity,
          },
          orderItemsLength: order.orderItems.length,
        });
      }

      return handlerResSuccess<IOrderHistoryRes[]>(
        GET_ORDER_HISTORY_SUCCESS,
        ordersHistoryRes
      );
    } catch (error) {
      console.log("error: ", error);
      return handleResFailure(ERROR_GET_ORDER_HISTORY, HttpStatus.BAD_REQUEST);
    }
  }
}
