export enum NodeEnvs {
  Dev = "development",
  Test = "test",
  Production = "production",
}

export const SOMETHING_WENT_WRONG_STRING = "Something went wrong.";

//best practices would have this value be synamically created based on a test of the user's internet speed
//or some premium features.
export const CHUNK_SIZE = 1024 * 1024; //1mb
