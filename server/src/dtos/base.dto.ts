import { Types } from "mongoose";

export class BaseDTO {
  _id: Types.ObjectId;
  constructor(object: any) {
    this._id = object._id;
  }
}
