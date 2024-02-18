import * as Formatter from "./formatter.js";
import * as Presenter from "./presenter.js";
import * as Writer from "./writer.js";

export const levelDebug = "debug";
export const levelInfo = "info";
export const levelWarn = "warn";
export const levelError = "error";
export const levelFatal = "fatal";
export const levelNone = "none";

const defaultOptions = {
  level: levelDebug,
  formatter: new Formatter.TextFormatter(),
  writer: new Writer.ConsoleWriter(),
  presenter: null,
  timestamp: () => new Date(),
};

export class Logger {
  constructor(options) {
    options = Object.assign(Object.assign({}, defaultOptions), options);

    this.#presenter = options.presenter
      ? options.presenter
      : new Presenter.Presenter(options.formatter, options.writer);
    this.#timestamp = options.timestamp;

    this.#applyLevel(options.level);
    this.#applyLevelSync(options.level);
  }

  #presenter;
  #timestamp;

  #debug;
  #info;
  #warn;
  #error;
  #fatal;

  #debugSync;
  #infoSync;
  #warnSync;
  #errorSync;
  #fatalSync;

  #applyLevel(level) {
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

  #applyLevelSync(level) {
    this.#debugSync = dropSync;
    this.#infoSync = dropSync;
    this.#warnSync = dropSync;
    this.#errorSync = dropSync;
    this.#fatalSync = dropSync;

    switch (level.toLowerCase()) {
      case levelDebug:
        this.#debugSync = printfSync;
      // falls through
      case levelInfo:
        this.#infoSync = printfSync;
      // falls through
      case levelWarn:
        this.#warnSync = printfSync;
      // falls through
      case levelError:
        this.#errorSync = printfSync;
      // falls through
      case levelFatal:
        this.#fatalSync = printfSync;
        break;
      case levelNone:
        break;
      default:
        throw `unknown level '${level}'`;
    }
  }

  async debug(data) {
    await this.#debug(this.#presenter, this.#timestamp(), levelDebug, data);
  }

  async info(data) {
    await this.#info(this.#presenter, this.#timestamp(), levelInfo, data);
  }

  async warn(data) {
    await this.#warn(this.#presenter, this.#timestamp(), levelWarn, data);
  }

  async error(data) {
    await this.#error(this.#presenter, this.#timestamp(), levelError, data);
  }

  async fatal(data) {
    await this.#fatal(this.#presenter, this.#timestamp(), levelFatal, data);
  }

  debugSync(data) {
    this.#debugSync(this.#presenter, this.#timestamp(), levelDebug, data);
  }

  infoSync(data) {
    this.#infoSync(this.#presenter, this.#timestamp(), levelInfo, data);
  }

  warnSync(data) {
    this.#warnSync(this.#presenter, this.#timestamp(), levelWarn, data);
  }

  errorSync(data) {
    this.#errorSync(this.#presenter, this.#timestamp(), levelError, data);
  }

  fatalSync(data) {
    this.#fatalSync(this.#presenter, this.#timestamp(), levelFatal, data);
  }
}

function drop() {
  // nothing to do.
}

function printf(presenter, now, level, data) {
  presenter.printf(now, level, data);
}

function dropSync() {
  // nothing to do.
}

function printfSync(presenter, timestamp, level, data) {
  presenter.printfSync(timestamp, level, data);
}
