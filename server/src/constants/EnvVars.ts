/**
 * Environments variables declared here.
 */

/* eslint-disable node/no-process-env */

export default {
  NODE_ENV: process.env.NODE_ENV ?? "",
  PORT: process.env.PORT ?? 3000,
  COOKIES: {
    Key: "jwt_token",
    Secret: process.env.COOKIE_SECRET ?? "change_this_secret",
    // Casing to match express cookie options
    Options: {
      httpOnly: true,
      signed: true,
      path: process.env.COOKIE_PATH ?? "/",
      maxAge: Number(process.env.COOKIE_EXP ?? 60 * 60 * 24 * 7),
      domain: process.env.COOKIE_DOMAIN ?? "localhost",
      secure: process.env.SECURE_COOKIE === "true",
    },
  },
  JWT: {
    Secret: process.env.JWT_SECRET ?? "change_this_secret",
    Exp: process.env.COOKIE_EXP ?? "7d", // exp at the same time as the cookie
  },
  DB: {
    port: process.env.DB_PORT ?? 27017,
    user: process.env.DB_USER ?? "root",
    pass: process.env.DB_PASS ?? "pass",
    name: process.env.DB_NAME ?? "database",
    host: process.env.DB_HOST ?? "0.0.0.0",
  },
  CORS_ORIGIN: process.env.CORS_ORIGIN ?? "http://localhost:3000",
} as const;
