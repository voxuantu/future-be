import { Body, Controller, Delete, Path, Post, Put, Route, Tags } from "tsoa";
import { CreateAddressDTO, UpdateAddressDTO } from "../dto/request";
import { AddressService } from "../services/address.service";

@Tags("Addresses")
@Route("addresses")
export class AddressController extends Controller {
  @Post()
  public async createAddress(@Body() dto: CreateAddressDTO) {
    return AddressService.create(dto);
  }

  @Put("/{id}")
  public async updateAddress(
    @Path() id: string,
    @Body() dto: UpdateAddressDTO
  ) {
    return AddressService.update(id, dto);
  }

  @Delete("/{id}")
  public async deleteAddress(@Path() id: string) {
    return AddressService.delete(id);
  }
}
