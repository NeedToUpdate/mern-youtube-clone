import { Video, VideoModel } from "@src/models/video.model";

export function createVideoFile({ author, title, extension }: { author: Video["author"]; title: Video["title"]; extension: Video["extension"] }) {
  return VideoModel.create({ author, title, extension });
}
