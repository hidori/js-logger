# @hidori/logger

Simple and flexible logger

## INSTALL

```sh
npm i @hidori/logger --save
```

## USAGE

### TEXT OUTPUT (Default)

```js
import { Logger } from "@hidor/logger";

const logger = new Logger();

logger.info("hello");
```

Output:
```log
2024-02-11T22:11:08+09:00 [INFO] hello
```

### JSON OUTPUT

```js
import { Logger } from "@hidor/logger";

const logger = new Logger({
    format: Logger.formatJson
});

logger.info({
    key: "ABC",
    value: "123"
});
```

Output:
```json
{"timestamp":"2024-02-11T22:17:59+09:00","level":"INFO","data":{"key":"ABC","value":"123"}}
```

## API

```js
logger.xxx(data)
```

Note:

* xxx is one of the [Levels](#Levels)

### <a href="#Levels"></a>Levels

* debug
* info
* warn
* error
* fatal

## CONFIGURATION

### LEVEL

```js
const logger = new Logger({
    level: "error"
});

logger.debug("hello");
logger.info("hello");
logger.warn("hello");
logger.error("hello");
logger.fatal("hello");
```

Output:

```log
2024-02-11T22:11:08+09:00 [ERROR] hello
2024-02-11T22:11:08+09:00 [FATAL] hello
```

Level and output:

| level | debug() | info() | warn() | error() | fatal() |
| :-- | :-- | :-- | :-- | :-- | :-- |
| "debug" | O | O | O | O | O |
| "info"  | - | O | O | O | O |
| "warn"  | - | - | O | O | O |
| "error" | - | - | - | O | O |
| "fatal" | - | - | - | - | O |
| "none"  | - | - | - | - | - |

### FORMAT

#### BUILTIN TEXT FORMATTER

```js
const logger = new Logger({
    format: Logger.formatText
});

logger.info("hello");
```

Output:
```log
2024-02-11T22:11:08+09:00 [INFO] hello
```
#### BUILTIN JSON FORMATTER

```js
const logger = new Logger({
    format: Logger.formatJson
});

logger.info({
    key: "ABC",
    value: "123"
});
```

Output:
```json
{"timestamp":"2024-02-11T22:17:59+09:00","level":"INFO","data":{"key":"ABC","value":"123"}}
```

#### CUSTOM FORMATTER (Example)

```js
const logger = new Logger({
    format: (timestamp, level, data) => {
        return `${Logger.toISOStringWithTimezone(timestamp)} [${level}] ${JSON.stringify(data)}`
    }
});

logger.info({
    key: "ABC",
    value: "123"
});
```

Output:
```log
2024-02-11T22:11:08+09:00 [INFO] {"key":"ABC","value":"123"}
```

### WRITE

```js
import { Logger } from "@hidor/logger";

const logger = new Logger({
    write: (data) => {
        const fileName = path.join(process.env.HOME, "log.txt");
        fs.appendFileSync(fileName, data + "\n");
    }
});

logger.info("hello");
```

Output:
```sh
$ cat ~/log.txt
2024-02-11T22:11:08+09:00 [INFO] hello
```

## LICENSE

MIT

Copyright (c) 2024 Hiroaki SHIBUKI
