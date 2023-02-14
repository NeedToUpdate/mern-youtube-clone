import mongoose from "mongoose";
import envVars from "@src/constants/envVars";
import logger from "./logger";

const DB_URI = `mongodb://${envVars.DB.user}:${envVars.DB.pass}@${envVars.DB.host}:${envVars.DB.port}/${envVars.DB.name}`;

//can be moved elsewhere for i18n
const DB_CONNECT_STRING = "Connected to database.";
const DB_CONNECT_ERROR_STRING = "Error connecting to database.";
const DB_DISCONNECT_STRING = "Disconnected from database.";

export async function connectDatabase() {
  try {
    await mongoose.connect(DB_URI);
    logger.info(DB_CONNECT_STRING);
  } catch (e) {
    logger.error(e, DB_CONNECT_ERROR_STRING);
  }
}

export async function disconnectDatabase() {
  await mongoose.connection.close();
  logger.info(DB_DISCONNECT_STRING);
}
