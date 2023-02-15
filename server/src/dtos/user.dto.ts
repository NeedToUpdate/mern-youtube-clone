import { User } from "@src/models/user.model";
import { BaseDTO } from "./base.dto";

//makes sure that we don't accidentally send someone the password or any other fields added in the future.

export class UserDTO extends BaseDTO {
  username: string;
  constructor(object: User) {
    super(object);
    this.username = object.username;
  }
}
