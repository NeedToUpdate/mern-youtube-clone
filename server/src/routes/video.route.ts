import { uploadVideoHandler } from "@src/controllers/video.controller";
import { loginRequired } from "@src/middleware/loginRequired";
import express from "express";

const router = express.Router();

router.post("/", loginRequired, uploadVideoHandler);

export default router;
