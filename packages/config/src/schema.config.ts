import { boolean, number, object, required, string } from "valibot";

export const configSchema = required(
  object({
    // APP
    api: object({
      port: number(),
    }),
    app: object({
      name: string(),
      secret: string(),
      webDir: string(),
      domain: string(),
    }),
    // DATABASE
    mongodb: object({
      uri: string(),
      master: string(),
      system: string(),
    }),
    // Throttler
    rate: object({
      ttl: number(),
      limit: number(),
    }),
    // JWT
    jwt: object({
      expire: number(),
      refreshExpire: number(),
    }),
    // Stripe
    stripe: object({
      secretKey: string(),
      publicKey: string(),
      webhookSecret: string(),
    }),
    // Redis
    redis: object({
      host: string(),
      port: number(),
      password: string(),
      username: string(),
      database: number(),
    }),
    // SMTP
    smtp: object({
      transport: string(),
      emailFrom: string(),
      senderName: string(),
      host: string(),
      port: number(),
      user: string(),
      password: string(),
      ignoreTLS: boolean(),
      secure: boolean(),
    }),
    // RMQ
    rmq: object({
      uri: string(),
    }),
    // Logtail
    logtail: object({
      token: string(),
    }),
  }),
);
