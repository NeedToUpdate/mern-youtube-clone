import { object, string, TypeOf } from "zod";

//these strings can be exported out to a i18n library if needed

export const registerUserSchema = {
  body: object({
    username: string({
      required_error: "Username is required.",
    }),
    password: string({
      required_error: "Password is required.",
    })
      .min(8, "Password must be minimum 8 characters.")
      .regex(/(?=.*[A-Z])(?=.*[!@#$&*])/, "Password must have at least one uppercase letter, and a special character (!@#$&*)"),
    confirmPassword: string({
      required_error: "Please confirm your password.",
    }),
  })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Password doesn't match.",
      path: ["confirmPassword"],
    })
    .refine((data) => data.password !== data.username, {
      //best practices this would be outsourced to a password strength library, and will check if its not a common password,
      //and checking if the username and password are too similar with a text similarity algo
      message: "Password cannot be your username",
      path: ["password"],
    }),
};

export type RegisterUserBody = TypeOf<typeof registerUserSchema.body>;
