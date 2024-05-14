import { HttpException, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { InjectAuthService } from "@vessel/common";
import { lastValueFrom } from "rxjs";

@Injectable()
export class ApiService {
  constructor(@InjectAuthService() private authClient: ClientProxy) {}

  async sayHi() {
    try {
      return await lastValueFrom(this.authClient.send("hello", { message: "Hello from API" }));
    } catch (error) {
      throw new HttpException(error.message, 400);
    }
  }
}
