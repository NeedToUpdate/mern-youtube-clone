import { compare, getHash } from "@src/util/crypto";
import { getModelForClass, prop, pre } from "@typegoose/typegoose";

@pre<User>("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const hash = await getHash(this.password);
    this.password = hash;
  }
  return next();
})
export class User {
  @prop({ required: true, unique: true })
  public username: string;

  @prop({ required: true })
  public password: string;

  public async comparePassword(password: string): Promise<boolean> {
    return compare(this.password, password);
  }
}

export const UserModel = getModelForClass(User);
