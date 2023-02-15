import app from "@src/app";
import { User, UserModel } from "@src/models/user.model";
import { getHash } from "@src/util/crypto";
import mongoose from "mongoose";
import supertest, { SuperTest, Test } from "supertest";
import request from "supertest";
import { login } from "../utils/auth";

//obviously you would want to make tests for every path of the routes
//including the video and auth routes, but that is outside the scope
//of this assignment

describe("Testing Users", () => {
  let agent: SuperTest<Test>, jwtCookie: string;
  beforeAll((done) => {
    agent = supertest.agent(app);
    login(agent, (cookie: string) => {
      jwtCookie = cookie;
      done();
    });
  });
  describe("[GET] /users", () => {
    it("lists all Users", async () => {
      const users = UserModel;

      users.find = jest.fn().mockReturnValue([
        {
          _id: "qpwoeiruty",
          username: "a_username",
          password: await getHash("q1w2e3r4!"),
        },
        {
          _id: "alskdjfhg",
          username: "b_username",
          password: await getHash("a1s2d3f4!"),
        },
        {
          _id: "zmxncbv",
          username: "c_username",
          password: await getHash("z1x2c3v4!"),
        },
      ]);

      (mongoose as any).connect = jest.fn();
      const res = await request(app).get("/api/users/").set("Cookie", jwtCookie);
      //successfully received all the users
      expect(res.status).toBe(200);
      expect(res.body.users.length).toBe(3);
      //and we dont accidentally send a password to anyone
      expect(res.body.users[0]).not.toHaveProperty("password");
    });
  });
});
