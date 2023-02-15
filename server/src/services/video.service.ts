import { Video, VideoModel } from "@src/models/video.model";

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
