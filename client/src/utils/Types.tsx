export type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export interface Video {
  _id: string;
  shortId: string;
  title: string;
  description: string;
  author: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  _id: string;
  username: string;
}
