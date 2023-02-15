import { createVideoFile, deleteVideoFile, getAllVideos, getVideoByShortId, searchVideosByText } from "@src/services/video.service";
import { getFilePathById } from "@src/util/misc";
import { Request, Response } from "express";
import formidable from "formidable";
import { StatusCodes } from "http-status-codes";
import fs from "fs";
import logger from "@src/util/logger";
import { DestroyVideoParams, RetrieveVideoParams, SearchVideoQuery, UpdateVideoBody, UpdateVideoParams } from "@src/schemas/video.schema";
import { VideoDTO } from "@src/dtos/video.dto";
import { ListQuery } from "@src/schemas/crud.schema";
import { CHUNK_SIZE, SOMETHING_WENT_WRONG_STRING } from "@src/constants/misc";

//small selection from https://mimetype.io/all-types/#video

//this could be expanded as you would convert all the video files to a format that works best
//for the platform before saving it, but for now these will do
//                          .mp4           .mpeg        .webm
const VIDEO_MIME_TYPES = ["video/mp4", "video/mpeg", "video/webm"];

//can be outsourced to a i18n library
const INVALID_FILE_SUBMITTED_ERROR = "Invalid file submitted.";
const ONLY_ONE_FILE_ALLOWED_ERROR = "Only one file can be uploaded at a time.";
const MUST_INCLUDE_TITLE_ERROR = "No title provided.";
const VIDEO_NOT_FOUND_ERROR = "No video found.";
const VIDEO_NOT_USERS_ERROR = "This is not your video.";
const STREAM_NEEDS_RANGE_ERROR = "Range not provided.";

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
    //then saves the video. But that is outside the scope of this project.
    const ext = file.originalFilename!.split(".").at(-1) || file.mimetype!.split("/").at(-1) || ".mp4"; //gets the last string in the array split by "."

    //you would also want to create a thumbnail in various resolutions here and save those.
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
      res.write(JSON.stringify(new VideoDTO(video)));
      res.end();
    });

    form.on("end", () => {});
  });
}

export async function updateVideoHandler(req: Request<UpdateVideoParams, {}, UpdateVideoBody>, res: Response) {
  const { shortId } = req.params;
  const { title, description } = req.body;
  const user = res.locals.user;

  const video = await getVideoByShortId(shortId);

  //we would also want to check for roles and such to allow moderation and admins to edit videos
  //best practice that there would be a permissions middleware taking care of this
  //but thats outside th scope of this project
  if (!video) {
    return res.status(StatusCodes.NOT_FOUND).send({ status: "ERROR", message: VIDEO_NOT_FOUND_ERROR });
  }
  if (video.author.toString() !== user._id) {
    return res.status(StatusCodes.FORBIDDEN).send({ status: "ERROR", message: VIDEO_NOT_USERS_ERROR });
  }

  if (title) {
    video.title = title;
  }
  if (description) {
    video.description = description;
  }

  await video.save();

  res.status(StatusCodes.OK).send(new VideoDTO(video));
}

export async function getAllVideosHandler(req: Request<{}, {}, {}, ListQuery>, res: Response) {
  const { skip, take } = req.query;
  //http params are always strings, but zod will make sure they're numeric
  try {
    const videos = await getAllVideos(parseInt(skip), parseInt(take));
    return res.status(StatusCodes.OK).send({ status: "SUCCESS", data: videos.map((video) => new VideoDTO(video)) });
  } catch (e) {
    logger.error(e);
    //if we cant get a list of users from the above function something must be wrong with the server
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ status: "ERROR", message: SOMETHING_WENT_WRONG_STRING });
  }
}

export async function deleteVideoHandler(req: Request<DestroyVideoParams>, res: Response) {
  const { shortId } = req.params;
  try {
    const video = await getVideoByShortId(shortId);
    const user = res.locals.user;
    if (!video) {
      return res.status(StatusCodes.NOT_FOUND).send({ status: "ERROR", message: VIDEO_NOT_FOUND_ERROR });
    }
    if (video.author.toString() !== user._id) {
      return res.status(StatusCodes.FORBIDDEN).send({ status: "ERROR", message: VIDEO_NOT_USERS_ERROR });
    }
    await deleteVideoFile({ shortId: video.shortId, extension: video.extension });
    video.delete();
    return res.status(StatusCodes.NO_CONTENT).end();
  } catch (e) {
    logger.error(e);
    //if we cant get a list of users from the above function something must be wrong with the server
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ status: "ERROR", message: SOMETHING_WENT_WRONG_STRING });
  }
}

export async function streamVideoHandler(req: Request<RetrieveVideoParams>, res: Response) {
  const { shortId } = req.params;

  const range = req.headers.range;

  if (!range) {
    return res.status(StatusCodes.BAD_REQUEST).send({ status: "ERROR", message: STREAM_NEEDS_RANGE_ERROR });
  }

  const video = await getVideoByShortId(shortId);
  if (!video) {
    return res.status(StatusCodes.NOT_FOUND).send({ status: "ERROR", message: VIDEO_NOT_FOUND_ERROR });
  }

  //again, you would want to just send back a link to the cloud storage here
  //its really bad practice to have the web server and the media server be the same thing
  const filePath = process.cwd() + getFilePathById(shortId, video.extension);

  const fileSizeInBytes = fs.statSync(filePath).size;

  const chunkStart = parseInt(range.replace(/\Dg/, "")); //remove any non-digit values

  const chunkEnd = Math.min(chunkStart + CHUNK_SIZE, fileSizeInBytes - 1); //make sure we don't try to read past the end

  const contentLength = chunkEnd - chunkStart + 1;

  const headers = {
    "Content-Range": `bytes ${chunkStart}-${chunkEnd}/$${fileSizeInBytes}`,
    "Accept-Ranges": `bytes`,
    "Content-Length": contentLength,
    "Content-Type": `video/${video.extension}`,
    "Cross-Origin-Resource-Policy": "cross-origin",
  };

  res.writeHead(StatusCodes.PARTIAL_CONTENT, headers);

  const stream = fs.createReadStream(filePath, {
    start: chunkStart,
    end: chunkEnd,
  });

  stream.pipe(res);
}

export async function searchVideoHandler(req: Request<{}, {}, {}, SearchVideoQuery>, res: Response) {
  const { skip, take, query } = req.query;
  //http params are always strings, but zod will make sure they're numeric
  try {
    //best practice search would split this whole section into a microservice
    //that would be cached for any common search terms, and wouldn't even touch the primary database, but search from
    //a read replica. Also could be completely outsourced to elasticsearch or some other cloud provider.
    const videos = await searchVideosByText(query, parseInt(skip), parseInt(take));
    return res.status(StatusCodes.OK).send({ status: "SUCCESS", data: videos.map((video) => new VideoDTO(video)) });
  } catch (e) {
    logger.error(e);
    //if we cant get a list of users from the above function something must be wrong with the server
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ status: "ERROR", message: SOMETHING_WENT_WRONG_STRING });
  }
}
