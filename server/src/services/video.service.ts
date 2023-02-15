import { Video, VideoModel } from "@src/models/video.model";
import logger from "@src/util/logger";
import { getFilePathById } from "@src/util/misc";
import fs from "fs";
export function createVideoFile({ author, title, extension }: { author: Video["author"]; title: Video["title"]; extension: Video["extension"] }) {
  return VideoModel.create({ author, title, extension });
}

export function getVideoByShortId(shortId: Video["shortId"]) {
  return VideoModel.findOne({ shortId });
}

export async function getAllVideos(skip: number, take: number) {
  return VideoModel.find({}, {}, { skip: skip, take: take });
}

export async function searchVideosByText(query: string, skip: number, take: number) {
  return VideoModel.find({ $text: { $search: query } }, {}, { skip: skip, take: take });
}

export async function deleteVideoFile({ shortId, extension }: { shortId: Video["shortId"]; extension: Video["extension"] }) {
  const filepath = process.cwd() + getFilePathById(shortId, extension);
  return new Promise<void>((resolve, reject) => {
    fs.unlink(filepath, (err) => {
      if (err) {
        logger.error(err);
        reject(err);
      }
      resolve();
    });
  });
}
