import { Controller, Get } from "@nestjs/common";
import { ApiService } from "./api.service";

@Controller()
export class ApiController {
  constructor(private readonly apiService: ApiService) {}

  @Get()
  getHello() {
    return this.apiService.sayHi();
  }
}
