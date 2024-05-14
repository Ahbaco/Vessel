import { Controller } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";

@Controller()
export class AuthController {
  @MessagePattern("hello")
  async handleHello(@Payload() data: Record<string, string>) {
    return { message: `Hello from Auth, ${data.message}` };
  }
}
