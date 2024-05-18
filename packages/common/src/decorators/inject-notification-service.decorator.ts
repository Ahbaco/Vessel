import { Inject } from "@nestjs/common";
import { RmqServices } from "../rmq/rmq-services.enum";

export const InjectNotificationService = () => Inject(RmqServices.Notification);
