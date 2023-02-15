export enum NodeEnvs {
  Dev = "development",
  Test = "test",
  Production = "production",
}

//these are used in multiple files
//best practices would be to send these over to a i18n library
export const SOMETHING_WENT_WRONG_STRING = "Something went wrong.";
export const MUST_BE_A_NUMBER_ERROR = "This parameter must be a number.";

//best practices would have this value be dynamically created based on a test of the user's internet speed
//or some premium features.
export const CHUNK_SIZE = 1024 * 1024; //1mb
