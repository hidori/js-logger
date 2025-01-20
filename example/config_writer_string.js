// import * as Logger from "@hidori/logger";
import * as Logger from '../src/index.js';

const writer = new Logger.StringWriter();
const logger = new Logger.Logger({
  writer: writer,
});

logger.infoSync('hello');

(async () => {
  await logger.info('hello');
})();

console.log(writer.toString());
