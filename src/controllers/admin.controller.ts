// src/users/usersController.ts
import {
  Body,
  Controller,
  Get,
  Post,
  Route,
  Security,
  Request,
  Path,
  Tags,
} from "tsoa";
import * as jwt from "jsonwebtoken";
import { AdminLogin, ICreateAdmin } from "../dto/request";
import { AdminService } from "../services/admin.services";

@Tags("Admin")
@Route("admin")
export class AdminController extends Controller {
  @Post()
  public createAdmin(@Body() dto: ICreateAdmin) {
    return AdminService.create(dto);
  }
  @Post("/login")
  public login(@Body() dto: AdminLogin) {
    return AdminService.login(dto);
  }
}

// đoạn này định nghĩa ra một interface IGetAdminAuthInfoRequest với JWT rồi làm tiếp @Put bằng AdminService.update(dto)
