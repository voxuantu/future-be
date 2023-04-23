import mongoose, {
  Document,
  Model,
  Schema,
  SchemaTimestampsConfig,
  model,
} from "mongoose";
import { IUserModel } from "./user";
import { IAddressModel } from "./address";
import { IOrderItemModel } from "./order-item";

export interface IOrder {
  user: string | IUserModel;
  address: string | IAddressModel;
  orderItems: string[] | IOrderItemModel[];
  total: number;
}

export interface IOrderModel extends IOrder, Document, SchemaTimestampsConfig {}

export const OrderSchema: Schema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, require: true, ref: "User" },
    address: { type: Schema.Types.ObjectId, require: true, ref: "Address" },
    orderItems: [
      { type: Schema.Types.ObjectId, require: true, ref: "OrderItem" },
    ],
    total: { type: Number },
  },
  { timestamps: true }
);

const Order = model<IOrderModel>("Order", OrderSchema);

export default Order;
