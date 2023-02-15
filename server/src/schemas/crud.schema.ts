import { MUST_BE_A_NUMBER_ERROR } from "@src/constants/misc";
import { number, object, string, TypeOf } from "zod";

//The basic generic crud methods are here, since in they only need generic properties that would be found on all objects

//update and create schemas would be found in their proper .schema.ts files.

export const listQuerySchema = {
  //best practices wold be to make sure only numeric values are passed here
  query: object({
    take: string().regex(/^\d+$/, MUST_BE_A_NUMBER_ERROR).optional().default("50"),
    skip: string().regex(/^\d+$/, MUST_BE_A_NUMBER_ERROR).optional().default("0"),
  }),
};

export type ListQuery = TypeOf<typeof listQuerySchema.query>;

export const retrieveSchema = {
  params: object({
    id: string(),
  }),
};

export type RetrieveParams = TypeOf<typeof retrieveSchema.params>;
