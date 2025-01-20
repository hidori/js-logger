import fs from 'fs';
import path from 'path';

// import * as Logger from "@hidori/logger";
import * as Logger from '../src/index.js';

const logger = new Logger.Logger({
  writer: {
    write: async (text) => {
      const fileName = path.join(
        process.env.HOME,
        './example_config_writer_custom.txt',
      );
      fs.appendFileSync(fileName, text + '\n');
    },

    writeSync: (text) => {
      const fileName = path.join(
        process.env.HOME,
        './example_config_writer_custom.txt',
      );
      fs.appendFileSync(fileName, text + '\n');
    },
  },
});

logger.infoSync('hello');

(async () => {
  await logger.info('hello');
})();
