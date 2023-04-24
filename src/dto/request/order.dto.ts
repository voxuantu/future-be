import { IOrderItem } from "../../models/order-item";

export interface ICreateOrder {
  orderItems: IOrderItem[];
  address: string;
}
