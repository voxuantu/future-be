import { OrderStatus } from "../../constances/enum";
import { IAddress } from "../../models/address";
import { IOrderItem } from "../../models/order-item";
import { IUserModel } from "../../models/user";

export interface IOrderHistoryRes {
  _id: string;
  shortId: string;
  total: number;
  createdAt: string;
  firstProduct: {
    _id: string;
    name: string;
    thumbnail: string;
    quantity: number;
    price: number;
  };
  orderItemsLength: number;
}

export interface IAllOrders {
  shortId: string;
  address: string | IAddress;
  userId: string | IUserModel;
  total: number;
  dateCreated: string;
  status: OrderStatus;
}

export interface IOrderItemsDetail {
  orderItems: IOrderItem[];
  totalQuantity: number;
}

export interface IUpdateStatus {
  orderId: string;
  status: OrderStatus;
}
