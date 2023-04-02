import mongoose, {
  Document,
  Model,
  Schema,
  SchemaTimestampsConfig,
  model,
} from "mongoose";

export interface IUser {
  name: string;
}

export interface IUserModel
  extends IUser,
    Document<IUser>,
    SchemaTimestampsConfig {}

export const UserSchema: Schema = new Schema(
  {
    name: { type: String, require: true },
  },
  { timestamps: true }
);

const User = model<IUserModel>("User", UserSchema);

export default User;
