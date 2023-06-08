// src/users/usersController.ts
import {
  Body,
  Controller,
  Get,
  Request,
  Post,
  Put,
  Route,
  Security,
  Tags,
} from "tsoa";
import { AdminLogin, ICreateAdmin, IUpdateAdmin } from "../dto/request";
import { AdminService } from "../services/admin.service";
import { IGetUserAuthInfoRequest } from "../types/express";

@Tags("Admin")
@Route("admin")
export class AdminController extends Controller {
  @Security("jwt", ["admin"])
  @Get()
  public getAdminById(@Request() request: IGetUserAuthInfoRequest) {
    return AdminService.findAdminById(request.user.userId);
  }

  @Security("jwt", ["admin"])
  @Get("/validate")
  public validateAdmin() {
    return true;
  }

  @Post()
  public createAdmin(@Body() dto: ICreateAdmin) {
    return AdminService.create(dto);
  }
  @Post("/login")
  public login(@Body() dto: AdminLogin) {
    return AdminService.login(dto);
  }

  @Security("jwt", ["admin"])
  @Put("/setting")
  public async update(
    @Body() dto: IUpdateAdmin,
    @Request() request: IGetUserAuthInfoRequest
  ) {
    return AdminService.update(dto, request.user.userId);
  }
}
