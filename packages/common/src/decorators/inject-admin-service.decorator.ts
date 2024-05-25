import { Inject } from "@nestjs/common";
import { RmqServices } from "../rmq";

export const InjectAdminService = () => Inject(RmqServices.Admin);
