// import * as Logger from "@hidori/logger";
import * as Logger from "../src/index.js";

const logger = new Logger.Logger({
  formatter: new Logger.JSONFormatter(),
});

logger.infoSync({
  key: "ABC",
  value: "123",
});

(async () => {
  await logger.info({
    key: "ABC",
    value: "123",
  });
})();
