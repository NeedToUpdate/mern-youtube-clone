import { getModelForClass, prop, pre, Ref } from "@typegoose/typegoose";
import { User } from "./user.model";
import { nanoid } from "nanoid";

export class Video {
  @prop({ unique: true, default: () => nanoid(7) })
  public shortId: string;

  @prop({ required: true })
  public title: string;

  @prop()
  public description: string;

  @prop({ required: true, ref: () => User })
  public author: Ref<User>;

  //this would be bad practice in production, as you would want to covert all video files to a format
  //the platform easily supports, has a low footprint, high quality, etc.
  //but implementing a transcoder is not within the scope of this application, so we will just save the extension
  //manually and leave it as is.
  @prop({ default: "mp4" })
  public extension: string;

  //needed for typescript
  public createdAt: Date;
  public updatedAt: Date;
}

export const VideoModel = getModelForClass(Video, {
  schemaOptions: {
    timestamps: true,
  },
});
