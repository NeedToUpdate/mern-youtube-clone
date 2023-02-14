import { User, UserModel } from "@src/models/user";

//we want to wrap database logic so if we want to change providers, run tests, or add functionality

export async function createUser(user: { username: string; password: string }) {
  return UserModel.create(user);
}
