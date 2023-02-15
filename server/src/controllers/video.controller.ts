import { createVideoFile } from "@src/services/video.service";
import { getFilePathById } from "@src/util/misc";
import { Request, Response } from "express";
import formidable from "formidable";
import { StatusCodes } from "http-status-codes";
import fs, { WriteStream } from "fs";
import logger from "@src/util/logger";
import { Video } from "@src/models/video.model";
import { BeAnObject, DocumentType } from "@typegoose/typegoose/lib/types";

//small selection from https://mimetype.io/all-types/#video

//this could be expanded as you would convert all the video files to a format that works best
//for the platform before saving it, but for now these will do
//                          .mp4           .mpeg        .webm
const VIDEO_MIME_TYPES = ["video/mp4", "video/mpeg", "video/webm"];

//can be outsourced to a i18n library
const INVALID_FILE_SUBMITTED_ERROR = "Invalid file submitted.";
const ONLY_ONE_FILE_ALLOWED_ERROR = "Only one file can be uploaded at a time.";
const MUST_INCLUDE_TITLE_ERROR = "No title provided.";
export async function uploadVideoHandler(req: Request, res: Response) {
  const user = res.locals.user;

  const form = new formidable.IncomingForm();

  form.parse(req, async (err, fields, files) => {
    if (err) {
      logger.error("Error uploading file.", err);
      return res.status(StatusCodes.BAD_REQUEST).send({ status: "ERROR", message: INVALID_FILE_SUBMITTED_ERROR });
    }
    //make sure we have a title

    if (!fields.title || typeof fields.title !== "string") {
      return res.status(StatusCodes.BAD_REQUEST).send({ status: "ERROR", message: MUST_INCLUDE_TITLE_ERROR });
    }

    //The form field is named video
    const actualFiles = files.video;
    //make sure the user didn't somehow submit multiple files or 0 files
    if (!actualFiles || (actualFiles instanceof Array && (actualFiles.length == 0 || actualFiles.length > 1))) {
      return res.status(StatusCodes.BAD_REQUEST).send({ status: "ERROR", message: ONLY_ONE_FILE_ALLOWED_ERROR });
    }
    //just in case it still sends as a 1 length array
    const file = actualFiles instanceof Array ? actualFiles[0] : actualFiles;
    if (!VIDEO_MIME_TYPES.includes(file.mimetype || "none")) {
      return res.status(StatusCodes.BAD_REQUEST).send({ status: "ERROR", message: INVALID_FILE_SUBMITTED_ERROR });
    }

    //this is really bad practice, since you're assuming that the video extension is correct in the name, which isn't always true
    //and some mime types don't match the extension. In this simple case, we're going to pretend it's all ok.
    //you would want to implement a class that double checks the files first, then converts them all to the filetype we want
    //then saves the video. But that is outside the scope of this assignment.
    const ext = file.originalFilename!.split(".").at(-1) || file.mimetype!.split("/").at(-1) || ".mp4"; //gets the last string in the array split by "."

    const video = await createVideoFile({ author: user._id, title: fields.title, extension: ext });

    //you wouldn't want to save the videos to the same machine as the app.
    //you would save the videos to a dedicated media server, like S3
    const filePath = process.cwd() + getFilePathById(video.shortId, ext);

    //formidable handles the writeStream for us
    //but if you were to have large files, it would be best to use multipart upload
    //and directly pipe it to a cloud storage like S3
    fs.rename(file.filepath, filePath, function (err) {
      console.log(filePath);
      res.writeHead(StatusCodes.CREATED, {
        "Connection": "close",
        "Content-Type": "application/json",
      });
      res.write(JSON.stringify(video));
      res.end();
    });

    form.on("end", () => {});
  });
}
