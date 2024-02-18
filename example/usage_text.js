// import * as Logger from "@hidori/logger";
import * as Logger from "../src/index.js";

const logger = new Logger.Logger();

logger.debugSync("hello");
logger.infoSync("hello");
logger.warnSync("hello");
logger.errorSync("hello");
logger.fatalSync("hello");

(async () => {
  await logger.debug("hello");
  await logger.info("hello");
  await logger.warn("hello");
  await logger.error("hello");
  await logger.fatal("hello");
})();
