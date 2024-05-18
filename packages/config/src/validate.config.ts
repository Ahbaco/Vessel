import { Logger } from "@nestjs/common";
import { safeParse } from "valibot";
import configuration from "./env.config";
import { configSchema } from "./schema.config";

export const validateConfig = (): Record<string, never> => {
  const config = configuration() ?? {};
  const result = safeParse(configSchema, config);

  if (!result.success) {
    const errors = result.issues.map(({ path, input, message }) => {
      if (!path) {
        return {
          key: "root",
          input,
          message,
        };
      }

      const key = path[0].key;
      const field = path[1] ? path[1].key : undefined;

      return {
        key,
        field,
        input,
        message,
      };
    });

    const log = new Logger();

    log.error("SOME ENVIRONMENT VARIABLES ARE INVALID");

    console.table(errors);
    process.exit(0);
  }

  return config;
};
