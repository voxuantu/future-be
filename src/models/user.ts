import mongoose, {
  Document,
  Model,
  Schema,
  SchemaTimestampsConfig,
  model,
} from "mongoose";
import { IAddressModel } from "./address";
import { IWishlistItemModel } from "./wishlist-item";

export interface IUser {
  name: string;
  email: string;
  username: string;
  password: string;
  avatar: string;
  birthday: string;
  addresses: string[] | IAddressModel[];
  wishlist: string[] | IWishlistItemModel[];
}

export interface IUserModel extends IUser, Document, SchemaTimestampsConfig {}

export const UserSchema: Schema = new Schema(
  {
    name: { type: String, require: true },
    email: { type: String },
    username: { type: String, require: true },
    password: { type: String, require: true },
    avatar: { type: String, require: true },
    birthday: { type: Date },
    addresses: [{ type: Schema.Types.ObjectId, ref: "Address" }],
    wishlist: [{ type: Schema.Types.ObjectId, ref: "WishlistItem" }],
  },
  { timestamps: true }
);

const User = model<IUserModel>("User", UserSchema);

export default User;
