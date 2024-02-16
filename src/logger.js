import fs from "fs";

export const levelDebug = "debug";
export const levelInfo = "info";
export const levelWarn = "warn";
export const levelError = "error";
export const levelFatal = "fatal";
export const levelNone = "none";

export class Logger {
  constructor(options) {
    if (options) {
      this.#options = Object.assign(this.#options, options);
    }

    this.#applyLevel(this.#options.level);
  }

  #options = {
    level: levelDebug,
    presenter: new Presenter(new TextFormatter(), new ConsoleWriter()),
    now: () => {
      return new Date();
    },
  };

  #debug;
  #info;
  #warn;
  #error;
  #fatal;

  #applyLevel(level) {
    const drop = () => {
      // nothing to do.
    };
    const printf = (level, data) => {
      this.#options.presenter.printf(this.#options.now(), level, data);
    };

    this.#debug = drop;
    this.#info = drop;
    this.#warn = drop;
    this.#error = drop;
    this.#fatal = drop;

    switch (level.toLowerCase()) {
      case levelDebug:
        this.#debug = printf;
      // falls through
      case levelInfo:
        this.#info = printf;
      // falls through
      case levelWarn:
        this.#warn = printf;
      // falls through
      case levelError:
        this.#error = printf;
      // falls through
      case levelFatal:
        this.#fatal = printf;
        break;
      case levelNone:
        break;
      default:
        throw `unknown level '${level}'`;
    }
  }

  debug(data) {
    this.#debug(levelDebug, data);
  }

  info(data) {
    this.#info(levelInfo, data);
  }

  warn(data) {
    this.#warn(levelWarn, data);
  }

  error(data) {
    this.#error(levelError, data);
  }

  fatal(data) {
    this.#fatal(levelFatal, data);
  }
}

export class Presenter {
  constructor(formatter, writer) {
    this.#format = (timestamp, level, data) => {
      return formatter.format(timestamp, level, data);
    };
    this.#write = (data) => {
      writer.write(data);
    };
  }

  #format;
  #write;

  printf(timestamp, level, data) {
    this.#write(this.#format(timestamp, level, data));
  }
}

export class TextFormatter {
  format(timestamp, level, data) {
    return `${toISOStringWithTimezone(timestamp)} [${level.toUpperCase()}] ${data}`;
  }
}

export class JSONFormatter {
  format(timestamp, level, data) {
    return JSON.stringify({
      timestamp: toISOStringWithTimezone(timestamp),
      level: level,
      data: data,
    });
  }
}

export class ConsoleWriter {
  write(data) {
    console.log(data);
  }
}

export class FileWriter {
  constructor(path) {
    this.#path = path;
  }

  #path;

  write(data) {
    fs.appendFileSync(this.#path, data + "\n");
  }
}

export class StringWriter {
  #str = "";

  write(data) {
    this.#str = `${this.#str}${data}\n`;
  }

  toString() {
    return this.#str;
  }
}

export function toISOStringWithTimezone(date) {
  const pad = function (str) {
    return ("0" + str).slice(-2);
  };
  const year = date.getFullYear().toString();
  const month = pad((date.getMonth() + 1).toString());
  const day = pad(date.getDate().toString());
  const hour = pad(date.getHours().toString());
  const min = pad(date.getMinutes().toString());
  const sec = pad(date.getSeconds().toString());
  const tz = -date.getTimezoneOffset();
  const sign = tz >= 0 ? "+" : "-";
  const tzHour = pad((tz / 60).toString());
  const tzMin = pad((tz % 60).toString());

  return `${year}-${month}-${day}T${hour}:${min}:${sec}${sign}${tzHour}:${tzMin}`;
}
