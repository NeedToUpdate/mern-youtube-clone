import { deleteVideoHandler, getAllVideosHandler, getVideoHandler, searchVideoHandler, streamVideoHandler, updateVideoHandler, uploadVideoHandler } from "@src/controllers/video.controller";
import { loginRequired } from "@src/middleware/loginRequired";
import express from "express";

const router = express.Router();

router.post("/", loginRequired, uploadVideoHandler);

router.patch("/:shortId", loginRequired, updateVideoHandler);

router.delete("/:shortId", loginRequired, deleteVideoHandler);

router.get("/search", searchVideoHandler);

router.get("/:shortId", streamVideoHandler);

router.get("/:shortId/data", getVideoHandler);

router.get("/", getAllVideosHandler);

export default router;
