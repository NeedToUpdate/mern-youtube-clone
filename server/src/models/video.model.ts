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
  public owner: Ref<User>;
}

export const VideoModel = getModelForClass(Video, {
  schemaOptions: {
    timestamps: true,
  },
});
