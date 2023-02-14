import envVars from "@src/constants/envVars";
import app from "./app";
import { connectDatabase, disconnectDatabase } from "./util/database";
import logger from "./util/logger";

// **** Run **** //

//These can be moved to a strings file if i18n is needed.
const SERVER_START_MSG = "Express server started on port: " + envVars.PORT.toString();
const SERVER_CLOSE_MSG = "Express server shut down.";

const server = app.listen(envVars.PORT, async () => {
  try {
    await connectDatabase();
  } catch (e) {
    logger.error(e);
    server.close();
    process.exit(1);
  }
  logger.info(SERVER_START_MSG);
});

const signals = ["SIGTERM", "SIGINT"];

function gracefulShutdown(signal: string) {
  process.on(signal, async () => {
    server.close();
    await disconnectDatabase();
    logger.info(SERVER_CLOSE_MSG);
    process.exit(0);
  });
}

signals.forEach((signal) => {
  gracefulShutdown(signal);
});
