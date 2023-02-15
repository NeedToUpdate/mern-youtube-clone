import { getAllUsersHandler, getUserByUsernameHandler, registerUserHandler } from "@src/controllers/user.controller";
import { loginRequired } from "@src/middleware/loginRequired";
import { registerUserSchema } from "@src/schemas/user.schema";
import express from "express";
import { processRequestBody } from "zod-express-middleware";

const router = express.Router();

router.post(
  "/",
  processRequestBody(registerUserSchema.body), //sanitizes the body with zod
  registerUserHandler
);

router.get("/", loginRequired, getAllUsersHandler);

router.get("/:id", loginRequired, getUserByUsernameHandler);

export default router;
