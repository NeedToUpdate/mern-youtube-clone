import { User, UserModel } from "@src/models/user.model";
import { getHash } from "@src/util/crypto";
import { omit } from "@src/util/misc";
import mongoose from "mongoose";
import { SuperTest, Test } from "supertest";
import { Response } from "supertest";

const LoginCreds = {
  _id: "18f39f20982n",
  username: "jsmith",
  password: "Password@1",
} as const;

export function login(beforeAgent: SuperTest<Test>, done: (arg: string) => void) {
  // Setup dummy data
  const pwdHash = getHash(LoginCreds.password);

  //mock creation of a user
  const users = UserModel;
  users.findOne = jest.fn().mockReturnValue(new UserModel(LoginCreds));
  (mongoose as any).connect = jest.fn();
  // Call Login API
  beforeAgent
    .post("/api/login/")
    .type("form")
    .send(omit(LoginCreds, "_id"))
    .end((_: Error, res: Response) => {
      const cookie = res.headers["set-cookie"][0];
      return done(cookie);
    });
}
