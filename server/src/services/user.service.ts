import { User, UserModel } from "@src/models/user.model";

//we want to wrap database logic so if we want to change providers, run tests, or add functionality

export async function createUser(user: Omit<User, "comparePassword">) {
  return UserModel.create(user);
}

export async function getUserByUsername(username: User["username"]) {
  console.log(username);
  return UserModel.findOne({ username });
}

export async function getAllUsers(skip: number, take: number) {
  return UserModel.find({}, {}, { skip: skip, take: take });
}

//you would also implement updateUser and deleteUser here, but that is not needed by the specs of the project.
