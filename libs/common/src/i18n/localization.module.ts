import { Module } from "@nestjs/common";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { HeaderResolver, I18nModule } from "nestjs-i18n";
import { LocalizationInterceptor } from "./localization.interceptor";

@Module({
  imports: [
    I18nModule.forRoot({
      fallbackLanguage: "en",
      loaderOptions: {
        path: "resources/lang/",
      },
      resolvers: [new HeaderResolver(["x-lang"])],
    }),
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LocalizationInterceptor,
    },
  ],
})
export class LocalizationModule {}
