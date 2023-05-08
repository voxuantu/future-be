import { Document, Schema, SchemaTimestampsConfig, model } from "mongoose";

export interface IAdmin {
  email: string;
  username: string;
  password: string;
}

export interface IAdminModel extends IAdmin, Document, SchemaTimestampsConfig {}

export const AdminSchema: Schema = new Schema(
  {
    email: { type: String },
    username: { type: String, require: true },
    password: { type: String, require: true },
  },
  { timestamps: true }
);

const Admin = model<IAdminModel>("Admin", AdminSchema);

export default Admin;
