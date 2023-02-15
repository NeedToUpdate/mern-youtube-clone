import { object, string, TypeOf } from "zod";

//strings can be outsourced to an i18n library

export const loginSchema = {
  body: object({
    username: string({
      required_error: "Username is required.",
    }),
    password: string({
      required_error: "Password is required.",
    }),
  }),
};

export type LoginBody = TypeOf<typeof loginSchema.body>;
