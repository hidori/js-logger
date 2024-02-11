"use strict";

export class Logger {
  constructor(options) {
    if (!options) {
      if (!options.level) {
        this.#level = options.level;
      }

      if (!options.format) {
        this.#format = options.format;
      }

      if (!options.write) {
        this.#write = options.write;
      }
    }

    this.#applyLevel(this.#level);
  }

  #level = "debug";
  #format = Logger.formatText;
  #write = console.log;

  #debug;
  #info;
  #warn;
  #error;
  #fatal;

  #applyLevel(level) {
    this.#debug = this.#drop;
    this.#info = this.#drop;
    this.#warn = this.#drop;
    this.#error = this.#drop;
    this.#fatal = this.#drop;

    switch (level.toLowerCase()) {
      case "debug":
        this.#debug = this.#output;
      // falls through
      case "info":
        this.#info = this.#output;
      // falls through
      case "warn":
        this.#warn = this.#output;
      // falls through
      case "error":
        this.#error = this.#output;
      // falls through
      case "fatal":
        this.#fatal = this.#output;
        break;
      case "none":
        break;
      default:
        throw `unknown level '${level}'`;
    }
  }

  #drop() {
    // nothing to do.
  }

  #output(level, data) {
    this.#write(this.#format(new Date(), level.toUpperCase(), data));
  }

  debug(data) {
    this.#debug("debug", data);
  }

  info(data) {
    this.#info("info", data);
  }

  warn(data) {
    this.#warn("warn", data);
  }

  error(data) {
    this.#error("error", data);
  }

  fatal(data) {
    this.#fatal("fatal", data);
  }

  static formatText(timestamp, level, data) {
    return `${Logger.toISOStringWithTimezone(timestamp)} [${level}] ${data}`;
  }

  static formatJson(timestamp, level, data) {
    return JSON.stringify({
      timestamp: Logger.toISOStringWithTimezone(timestamp),
      level: level,
      data: data,
    });
  }

  static toISOStringWithTimezone(date) {
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
}
