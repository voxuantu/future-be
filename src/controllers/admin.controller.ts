// src/users/usersController.ts
import { Body, Controller, Get, Post, Route, Security, Tags } from "tsoa";
import { AdminLogin, ICreateAdmin } from "../dto/request";
import { AdminService } from "../services/admin.service";

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

  @Security("jwt", ["admin"])
  @Get("/test")
  public test() {
    return "hello";
  }
}

// đoạn này định nghĩa ra một interface IGetAdminAuthInfoRequest với JWT rồi làm tiếp @Put bằng AdminService.update(dto)
