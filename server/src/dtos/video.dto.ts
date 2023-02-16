import { Video } from "@src/models/video.model";
import { BaseDTO } from "./base.dto";

//makes sure that we don't accidentally send someone the password or any other fields added in the future.

export class VideoDTO extends BaseDTO {
  "title": string;
  "author": string;
  "shortId": string;
  "createdAt": string;
  "updatedAt": string;
  "description": string;
  "constructor"(object: Video) {
    super(object);
    this.title = object.title;
    this.author = object.author.toString();
    this.shortId = object.shortId;
    this.description = object.description;
    this.createdAt = object.createdAt.toLocaleString("en");
    this.updatedAt = object.updatedAt.toLocaleString("en");
  }
}
