import { loginHandler } from "@src/controllers/auth.controller";
import { loginSchema } from "@src/schemas/auth.schema";
import express from "express";
import { processRequestBody } from "zod-express-middleware";

const router = express.Router();

router.post(
  "/",
  processRequestBody(loginSchema.body), //sanitizes the body with zod
  loginHandler
);

router.get("/");

router.get("/:id");

export default router;
