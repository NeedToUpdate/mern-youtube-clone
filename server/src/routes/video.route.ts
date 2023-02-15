import { deleteVideoHandler, getAllVideosHandler, streamVideoHandler, updateVideoHandler, uploadVideoHandler } from "@src/controllers/video.controller";
import { loginRequired } from "@src/middleware/loginRequired";
import express from "express";

const router = express.Router();

router.post("/", loginRequired, uploadVideoHandler);
router.patch("/:shortId", loginRequired, updateVideoHandler);
router.delete("/:shortId", loginRequired, deleteVideoHandler);
router.get("/", getAllVideosHandler);

//you would also want to have a getMetadata function for one video so you don't need to stream it
//while showing the use the information, but thats outside the scope of this project
router.get("/:shortId", streamVideoHandler);

export default router;
