import pino from "pino";

const logger = pino({
  transport: {
    target: "pino-pretty",
    option: {
      colorize: true,
    },
  },
});

export default logger;
