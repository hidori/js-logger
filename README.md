# @hidori/logger

Simple and flexible logger

## INSTALL

```sh
npm i --save @hidori/logger
```

## USAGE

### TEXT OUTPUT

Code:
```js
import * as Logger from "@hidori/logger";

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
```

Output:
```log
2024-02-18T23:15:57.767+09:00 [DEBUG] hello
2024-02-18T23:15:57.774+09:00 [INFO] hello
2024-02-18T23:15:57.775+09:00 [WARN] hello
2024-02-18T23:15:57.775+09:00 [ERROR] hello
2024-02-18T23:15:57.775+09:00 [FATAL] hello
2024-02-18T23:15:57.775+09:00 [DEBUG] hello
2024-02-18T23:15:57.775+09:00 [INFO] hello
2024-02-18T23:15:57.775+09:00 [WARN] hello
2024-02-18T23:15:57.776+09:00 [ERROR] hello
2024-02-18T23:15:57.776+09:00 [FATAL] hello
```

### JSON OUTPUT

Code:
```js
import * as Logger from "@hidori/logger";

const logger = new Logger.Logger({
  formatter: new Logger.JSONFormatter(),
});

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
```

Output:
```json
{"timestamp":"2024-02-18T23:15:57.722+09:00","level":"debug","data":"hello"}
{"timestamp":"2024-02-18T23:15:57.727+09:00","level":"info","data":"hello"}
{"timestamp":"2024-02-18T23:15:57.727+09:00","level":"warn","data":"hello"}
{"timestamp":"2024-02-18T23:15:57.727+09:00","level":"error","data":"hello"}
{"timestamp":"2024-02-18T23:15:57.727+09:00","level":"fatal","data":"hello"}
{"timestamp":"2024-02-18T23:15:57.728+09:00","level":"debug","data":"hello"}
{"timestamp":"2024-02-18T23:15:57.728+09:00","level":"info","data":"hello"}
{"timestamp":"2024-02-18T23:15:57.728+09:00","level":"warn","data":"hello"}
{"timestamp":"2024-02-18T23:15:57.728+09:00","level":"error","data":"hello"}
{"timestamp":"2024-02-18T23:15:57.728+09:00","level":"fatal","data":"hello"}
```

## API

### ASYNC

Signature:
```js
logger.xxx(data)
```
xxx is one of the [LEVELS](#LEVELS)

### SYNC

Signature:
```js
logger.xxxSync(data)
```
xxx is one of the [LEVELS](#LEVELS)

### <a href="#LEVELS"></a>LEVELS

* debug
* info
* warn
* error
* fatal

## CONFIGURATION

### LEVEL

Code:
```js
import * as Logger from "@hidori/logger";

const logger = new Logger.Logger({
  level: Logger.levelError,
});

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
```

Output:
```log
2024-02-18T23:52:35.574+09:00 [ERROR] hello
2024-02-18T23:52:35.579+09:00 [FATAL] hello
2024-02-18T23:52:35.579+09:00 [ERROR] hello
2024-02-18T23:52:35.579+09:00 [FATAL] hello
```

Relationship between level and output:
| level | debug()/debugSync() | info()/infoSync() | warn()/warnSync() | error()/errorSync() | fatal()/fatalSync() |
| :-- | :-- | :-- | :-- | :-- | :-- |
| levelDebug | O | O | O | O | O |
| levelInfo  | - | O | O | O | O |
| levelWarn  | - | - | O | O | O |
| levelError | - | - | - | O | O |
| levelFatal | - | - | - | - | O |
| levelNone  | - | - | - | - | - |

### FORMATTER

#### BUILTIN TEXT FORMATTER (DEFAULT)

Code:
```js
import * as Logger from "../src/index.js";

const logger = new Logger.Logger({
  formatter: new Logger.TextFormatter(),
});

logger.infoSync("hello");

(async () => {
  await logger.info({
    key: "ABC",
    value: "123",
  });
})();
```

Output:
```log
2024-02-19T00:20:33.075+09:00 [INFO] hello
2024-02-19T00:20:33.075+09:00 [INFO] hello
```
#### BUILTIN JSON FORMATTER

Code:
```js
import * as Logger from "@hidori/logger";

const logger = new Logger.Logger({
  formatter: new Logger.TextFormatter(),
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
```

Output:
```json
{"timestamp":"2024-02-19T00:20:33.037+09:00","level":"info","data":{"key":"ABC","value":"123"}}
{"timestamp":"2024-02-19T00:20:33.037+09:00","level":"info","data":{"key":"ABC","value":"123"}}
```

#### CUSTOM FORMATTER

Code:
```js
const logger = new Logger.Logger({
  formatter: {
    format: (timestamp, level, data) => {
      return `${Logger.toISOStringWithTimezone(timestamp)} [${level.toUpperCase()}] ${JSON.stringify(data)}`;
    }
  },
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
```

Output:
```log
2024-02-19T00:34:44.174+09:00 [INFO] {"key":"ABC","value":"123"}
2024-02-19T00:34:44.179+09:00 [INFO] {"key":"ABC","value":"123"}
```

### WRITER

#### BUILTIN CONSOLE WRITER (DEFAULT)

Code:
```go
import * as Logger from "@hidori/logger";

const writer = new Logger.ConsoleWriter();
const logger = new Logger.Logger({
  writer: writer,
});

logger.infoSync("hello");

(async () => {
  await logger.info("hello");
})();
```

Output:
```log
2024-02-19T00:56:08.305+09:00 [INFO] hello
2024-02-19T00:56:08.309+09:00 [INFO] hello
```

#### BUILTIN STRING WRITER

Code:
```go
import * as Logger from "@hidori/logger";

const writer = new Logger.StringWriter();
const logger = new Logger.Logger({
  writer: writer,
});

logger.infoSync("hello");

(async () => {
  await logger.info("hello");
})();

console.log(writer.toString());
```

Output:
```log
2024-02-19T00:56:08.398+09:00 [INFO] hello
2024-02-19T00:56:08.398+09:00 [INFO] hello
```

#### CUSTOM WRITER

Code:
```js
import fs from "fs";
import path from "path";

import * as Logger from "@hidori/logger";

const logger = new Logger.Logger({
  writer: {
    write: async (text) => {
      const fileName = path.join(
        process.env.HOME,
        "./example_config_writer_custom.txt",
      );
      fs.appendFileSync(fileName, text + "\n");
    },

    writeSync: (text) => {
      const fileName = path.join(
        process.env.HOME,
        "./example_config_writer_custom.txt",
      );
      fs.appendFileSync(fileName, text + "\n");
    },
  },
});

logger.infoSync("hello");

(async () => {
  await logger.info("hello");
})();
```

Output:
```sh
$ cat ~/example_config_writer_custom.txt
2024-02-19T00:48:08.529+09:00 [INFO] hello
2024-02-19T00:48:08.529+09:00 [INFO] hello
```

## LICENSE

MIT

Copyright (c) 2024 Hiroaki SHIBUKI
