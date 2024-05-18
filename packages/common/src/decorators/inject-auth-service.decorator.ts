import { Inject } from "@nestjs/common";
import { RmqServices } from "../rmq/rmq-services.enum";

export const InjectAuthService = () => Inject(RmqServices.Auth);
