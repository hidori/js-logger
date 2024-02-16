import * as Logger from "./src/logger.js";

const logger = new Logger.Logger();

logger.debug("hello");
logger.info("hello");
logger.warn("hello");
logger.error("hello");
logger.fatal("hello");
