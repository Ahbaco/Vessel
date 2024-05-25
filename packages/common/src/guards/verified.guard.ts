import { CanActivate, ExecutionContext, HttpException, Injectable } from "@nestjs/common";
import { User } from "@vessel/database/schemas";

@Injectable()
export class VerifiedGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const user = context.switchToHttp().getRequest().user as User;

    if (user.verifiedAt) {
      return true;
    }

    throw new HttpException("auth.unverified_email", 403);
  }
}
