import { registerUserHandler } from "@src/controllers/user";
import { registerUserSchema } from "@src/schemas/user";
import express from "express";
import { processRequestBody } from "zod-express-middleware";

const router = express.Router();

router.post(
  "/",
  processRequestBody(registerUserSchema.body), //sanitizes the body with zod
  registerUserHandler
);

router.get("/");

router.get("/:id");

export default router;
