import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { I18nContext, I18nService } from "nestjs-i18n";
import { Observable, map } from "rxjs";

interface Response {
  message: string;
}

@Injectable()
export class LocalizationInterceptor implements NestInterceptor {
  constructor(private readonly i18n: I18nService) {}

  private translate(key: string) {
    const lang = I18nContext.current()?.lang;
    return this.i18n.t(key, { lang });
  }

  intercept(_context: ExecutionContext, next: CallHandler): Observable<Response> {
    return next.handle().pipe(
      map((data) => {
        if (data.message) {
          return {
            ...data,
            message: this.translate(data.message),
          };
        }

        return data;
      }),
    );
  }
}
