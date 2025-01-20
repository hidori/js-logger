// import * as Logger from "@hidori/logger";
import * as Logger from '../src/index.js';

const logger = new Logger.Logger({
  formatter: new Logger.TextFormatter(),
});

logger.infoSync('hello');

(async () => {
  await logger.info({
    key: 'ABC',
    value: '123',
  });
})();
