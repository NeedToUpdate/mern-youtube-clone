import { object, string, TypeOf } from "zod";

export const updateVideoSchema = {
  body: object({
    title: string().optional(),
    description: string().optional(),
  }),
  params: object({
    shortId: string(),
  }),
};

export type UpdateVideoBody = TypeOf<typeof updateVideoSchema.body>;
export type UpdateVideoParams = TypeOf<typeof updateVideoSchema.params>;

export const destroyVideoSchema = {
  params: object({
    shortId: string(),
  }),
};

export type DestroyVideoParams = TypeOf<typeof destroyVideoSchema.params>;

//identical as above for now, but kept separate just in case for flexibility,
//perhaps we need to add mfa delete for the delete params later on
export const RetrieveVideoParams = {
  params: object({
    shortId: string(),
  }),
};

export type RetrieveVideoParams = TypeOf<typeof destroyVideoSchema.params>;
