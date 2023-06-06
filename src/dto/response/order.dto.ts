import { OrderStatus } from "../../constances/enum";
import { IAddress, IAddressModel } from "../../models/address";
import { IOrderItemModel } from "../../models/order-item";
import { IProductModel } from "../../models/product";
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

export interface IOrderRes {
  _id: string;
  address: {
    _id: string;
    province: string;
    district: string;
    ward: string;
    specificAddress: string;
    phone: string;
    receiver: string;
  };
  orderItems: IOrderItemRes[];
  total: number;
  status: OrderStatus;
  shortId: string;
  paymentMethod: string;
  createdAt: string;
}

export interface IOrderItemRes {
  _id: string;
  price: number;
  quantity: number;
  product: {
    _id: string;
    name: string;
    thumbnail: string;
  };
}

export interface IAllOrders {
  shortId: string;
  address: string | IAddress;
  userId: string | IUserModel;
  total: number;
  status: OrderStatus;
}

export interface ICreateMAC {
  app_id: number;
  app_trans_id: string;
  app_user: string;
  amount: number;
  app_time: number;
  embed_data: JSON;
  item: JSON[];
}

export interface IQueryZaloPayOrderStatusRes {
  orderStatus: number;
}
