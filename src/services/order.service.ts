import {
  CREATE_ORDER_SUCCESS,
  ERROR_CREATE_ORDER,
  ERROR_GET_ALL_ORDERS,
  ERROR_GET_ORDER_HISTORY,
  ERROR_ORDER_NOT_FOUND,
  ERROR_PRODUCT_NOT_FOUND,
  ERROR_UPDATE_STATUS,
  ERROR_USER_NOT_FOUND,
  GET_ALL_ORDERS_SUCCESS,
  GET_ORDER_HISTORY_SUCCESS,
} from "../constances";
import { HttpStatus, OrderStatus } from "../constances/enum";
import { ICreateOrder } from "../dto/request";
import { IAllOrders, IOrderHistoryRes } from "../dto/response/order.dto";
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
  static async getAllOrders(limit: number, page: number) {
    try {
      const orderArray: IAllOrders[] = [
        {
          shortId: "1",
          address: "2",
          userId: "3",
          status: OrderStatus.Delivering,
          dateCreated: new Date().toLocaleDateString(),
          total: 12,
        },
        {
          shortId: "2",
          address: "3",
          userId: "4",
          status: OrderStatus.Completed,
          dateCreated: new Date().toLocaleDateString(),
          total: 89000,
        },
        {
          shortId: "3",
          address: "2",
          userId: "3",
          status: OrderStatus.Delivering,
          dateCreated: "11/2/2001",
          total: 12,
        },
        {
          shortId: "4",
          address: "3",
          userId: "4",
          status: OrderStatus.Completed,
          dateCreated: "11/2/2001",
          total: 89000,
        },
      ];
      const allOrders = await Order.find()
        .limit(limit)
        .skip(page * limit);
      // if (!allOrders) {
      //   return handleResFailure(ERROR_GET_ALL_ORDERS, HttpStatus.NOT_FOUND);
      // }
      allOrders.map((item) =>
        orderArray.push({
          shortId: item.shortId,
          address: item.address,
          userId: item.user,
          status: item.status,
          dateCreated: item.createdAt as string,
          total: item.total,
        })
      );
      return handlerResSuccess<IAllOrders[]>(
        GET_ALL_ORDERS_SUCCESS,
        orderArray
      );
    } catch (error) {
      console.log("error", error);
      return handleResFailure(ERROR_GET_ALL_ORDERS, HttpStatus.BAD_REQUEST);
    }
  }
  static async getOrdersFollowDate(limit: number, page: number) {
    try {
      const orderArray: IAllOrders[] = [
        // {
        //   shortId: "1",
        //   address: "2",
        //   userId: "3",
        //   status: OrderStatus.Delivering,
        //   dateCreated: new Date().toLocaleDateString(),
        //   total: 12,
        // },
        // {
        //   shortId: "2",
        //   address: "3",
        //   userId: "4",
        //   status: OrderStatus.Completed,
        //   dateCreated: new Date().toLocaleDateString(),
        //   total: 89000,
        // },
        {
          shortId: "3",
          address: "2",
          userId: "3",
          status: OrderStatus.Delivering,
          dateCreated: "11/2/2001",
          total: 12,
        },
        {
          shortId: "4",
          address: "3",
          userId: "4",
          status: OrderStatus.Completed,
          dateCreated: "11/2/2001",
          total: 89000,
        },
      ];
      const today = new Date();
      today.setUTCHours(0, 0, 0, 0); // Đặt giá trị giờ phút giây của ngày hiện tại về 00:00:00
      const tomorrow = new Date(today);
      tomorrow.setUTCDate(tomorrow.getUTCDate() + 1); // Tăng ngày lên 1 để xác định đến cuối ngày
      const allOrders = await Order.find({
        createdAt: {
          $gte: today,
          $lt: tomorrow,
        },
      })
        .limit(limit)
        .skip(page * limit);
      // if (!allOrders) {
      //   return handleResFailure(ERROR_GET_ALL_ORDERS, HttpStatus.NOT_FOUND);
      // }
      allOrders.map((item) => {
        orderArray.push({
          shortId: item.shortId,
          address: item.address,
          userId: item.user,
          status: item.status,
          dateCreated: item.createdAt as string,
          total: item.total,
        });
      });
      return handlerResSuccess<IAllOrders[]>(
        GET_ALL_ORDERS_SUCCESS,
        orderArray
      );
    } catch (error) {
      console.log("error", error);
      return handleResFailure(ERROR_GET_ALL_ORDERS, HttpStatus.BAD_REQUEST);
    }
  }
  static async updateStatusOrder(orderId: string, status: OrderStatus) {
    try {
      const orderStatus = await Order.updateOne(
        { shortId: { $eq: orderId } },
        { $set: { status: status } }
      );
      console.log(orderStatus);
      // if (orderStatus.modifiedCount === 0) {
      //   return handleResFailure(ERROR_ORDER_NOT_FOUND, HttpStatus.NOT_FOUND);
      // }
      return handlerResSuccess<string>(
        GET_ALL_ORDERS_SUCCESS,
        `update thành công qua quá trình ${status}`
      );
    } catch (error) {
      console.log("error", error);
      return handleResFailure(ERROR_UPDATE_STATUS, HttpStatus.BAD_REQUEST);
    }
  }
  // static async getOrderItemsById(orderId: number) {
  //   try {
  //     const orderItemsId = await Order.findOne({ shortId: { $eq: orderId } });
  //     if (!orderItemsId) {
  //       return handleResFailure(ERROR_USER_NOT_FOUND, HttpStatus.NOT_FOUND);
  //     }
  //     const orderItemsArrayDetail = Promise.all(
  //       orderItemsId.orderItems.map(async (item) => {
  //         const a = await OrderItem.findById(item._id);
  //       })
  //     ).then();
  //   } catch (error) {
  //     console.log("error", error);
  //     return handleResFailure(ERROR_GET_ALL_ORDERS, HttpStatus.BAD_REQUEST);
  //   }
  // }
}
