import { User } from "@src/models/user.model";
import { BaseDTO } from "./base.dto";

export class UserDTO extends BaseDTO {
  username: string;
  constructor(object: User) {
    super(object);
    this.username = object.username;
  }
}
