import * as Formatter from "./formatter.js";
import * as Logger from "./logger.js";
import * as Writer from "./writer.js";

const timestamp = () => new Date(2024, 0, 1, 2, 3, 4, 5, 6);

describe("class Logger", () => {
  describe("xxx()", () => {
    test("level=levelNone, outputs anything", async () => {
      const writer = new Writer.StringWriter();
      const options = {
        level: Logger.levelNone,
        writer: writer,
        timestamp: timestamp,
      };

      const target = new Logger.Logger(options);
      await target.debug("hello");
      await target.info("hello");
      await target.warn("hello");
      await target.error("hello");
      await target.fatal("hello");
      expect(writer.toString()).toBe("");
    });

    test("level=levelDebug, outputs `debug`, `info`, `warn`, `error`, `fatal` log(s)", async () => {
      const writer = new Writer.StringWriter();
      const options = {
        level: Logger.levelDebug,
        writer: writer,
        timestamp: timestamp,
      };

      const target = new Logger.Logger(options);
      await target.debug("hello");
      await target.info("hello");
      await target.warn("hello");
      await target.error("hello");
      await target.fatal("hello");
      expect(writer.toString()).toBe(
        [
          `${Formatter.toISOStringWithTimezone(timestamp())} [DEBUG] hello\n`,
          `${Formatter.toISOStringWithTimezone(timestamp())} [INFO] hello\n`,
          `${Formatter.toISOStringWithTimezone(timestamp())} [WARN] hello\n`,
          `${Formatter.toISOStringWithTimezone(timestamp())} [ERROR] hello\n`,
          `${Formatter.toISOStringWithTimezone(timestamp())} [FATAL] hello\n`,
        ].join(""),
      );
    });

    test("level=levelInfo, outputs `info`, `warn`, `error`, `fatal` log(s)", async () => {
      const writer = new Writer.StringWriter();
      const options = {
        level: Logger.levelInfo,
        writer: writer,
        timestamp: timestamp,
      };

      const target = new Logger.Logger(options);
      await target.debug("hello");
      await target.info("hello");
      await target.warn("hello");
      await target.error("hello");
      await target.fatal("hello");
      expect(writer.toString()).toBe(
        [
          `${Formatter.toISOStringWithTimezone(timestamp())} [INFO] hello\n`,
          `${Formatter.toISOStringWithTimezone(timestamp())} [WARN] hello\n`,
          `${Formatter.toISOStringWithTimezone(timestamp())} [ERROR] hello\n`,
          `${Formatter.toISOStringWithTimezone(timestamp())} [FATAL] hello\n`,
        ].join(""),
      );
    });

    test("level=levelWarn, outputs `warn`, `error`, `fatal` log(s)", async () => {
      const writer = new Writer.StringWriter();
      const options = {
        level: Logger.levelWarn,
        writer: writer,
        timestamp: timestamp,
      };

      const target = new Logger.Logger(options);
      await target.debug("hello");
      await target.info("hello");
      await target.warn("hello");
      await target.error("hello");
      await target.fatal("hello");
      expect(writer.toString()).toBe(
        [
          `${Formatter.toISOStringWithTimezone(timestamp())} [WARN] hello\n`,
          `${Formatter.toISOStringWithTimezone(timestamp())} [ERROR] hello\n`,
          `${Formatter.toISOStringWithTimezone(timestamp())} [FATAL] hello\n`,
        ].join(""),
      );
    });

    test("level=levelError, outputs `error`, `fatal` log(s)", async () => {
      const writer = new Writer.StringWriter();
      const options = {
        level: Logger.levelError,
        writer: writer,
        timestamp: timestamp,
      };

      const target = new Logger.Logger(options);
      await target.debug("hello");
      await target.info("hello");
      await target.warn("hello");
      await target.error("hello");
      await target.fatal("hello");
      expect(writer.toString()).toBe(
        [
          `${Formatter.toISOStringWithTimezone(timestamp())} [ERROR] hello\n`,
          `${Formatter.toISOStringWithTimezone(timestamp())} [FATAL] hello\n`,
        ].join(""),
      );
    });

    test("level=levelFatal, outputs `fatal` log(s)", async () => {
      const writer = new Writer.StringWriter();
      const options = {
        level: Logger.levelFatal,
        writer: writer,
        timestamp: timestamp,
      };

      const target = new Logger.Logger(options);
      await target.debug("hello");
      await target.info("hello");
      await target.warn("hello");
      await target.error("hello");
      await target.fatal("hello");
      expect(writer.toString()).toBe(
        [
          `${Formatter.toISOStringWithTimezone(timestamp())} [FATAL] hello\n`,
        ].join(""),
      );
    });
  });

  describe("xxxSync()", () => {
    test("level=levelNone, outputs anything", () => {
      const writer = new Writer.StringWriter();
      const options = {
        level: Logger.levelNone,
        writer: writer,
        timestamp: timestamp,
      };

      const target = new Logger.Logger(options);
      target.debugSync("hello");
      target.infoSync("hello");
      target.warnSync("hello");
      target.errorSync("hello");
      target.fatalSync("hello");
      expect(writer.toString()).toBe("");
    });

    test("level=levelDebug, outputs `debug`, `info`, `warn`, `error`, `fatal` log(s)", () => {
      const writer = new Writer.StringWriter();
      const options = {
        level: Logger.levelDebug,
        writer: writer,
        timestamp: timestamp,
      };

      const target = new Logger.Logger(options);
      target.debugSync("hello");
      target.infoSync("hello");
      target.warnSync("hello");
      target.errorSync("hello");
      target.fatalSync("hello");
      expect(writer.toString()).toBe(
        [
          `${Formatter.toISOStringWithTimezone(timestamp())} [DEBUG] hello\n`,
          `${Formatter.toISOStringWithTimezone(timestamp())} [INFO] hello\n`,
          `${Formatter.toISOStringWithTimezone(timestamp())} [WARN] hello\n`,
          `${Formatter.toISOStringWithTimezone(timestamp())} [ERROR] hello\n`,
          `${Formatter.toISOStringWithTimezone(timestamp())} [FATAL] hello\n`,
        ].join(""),
      );
    });

    test("level=levelInfo, outputs `info`, `warn`, `error`, `fatal` log(s)", () => {
      const writer = new Writer.StringWriter();
      const options = {
        level: Logger.levelInfo,
        writer: writer,
        timestamp: timestamp,
      };

      const target = new Logger.Logger(options);
      target.debugSync("hello");
      target.infoSync("hello");
      target.warnSync("hello");
      target.errorSync("hello");
      target.fatalSync("hello");
      expect(writer.toString()).toBe(
        [
          `${Formatter.toISOStringWithTimezone(timestamp())} [INFO] hello\n`,
          `${Formatter.toISOStringWithTimezone(timestamp())} [WARN] hello\n`,
          `${Formatter.toISOStringWithTimezone(timestamp())} [ERROR] hello\n`,
          `${Formatter.toISOStringWithTimezone(timestamp())} [FATAL] hello\n`,
        ].join(""),
      );
    });

    test("level=levelWarn, outputs `warn`, `error`, `fatal` log(s)", () => {
      const writer = new Writer.StringWriter();
      const options = {
        level: Logger.levelWarn,
        writer: writer,
        timestamp: timestamp,
      };

      const target = new Logger.Logger(options);
      target.debugSync("hello");
      target.infoSync("hello");
      target.warnSync("hello");
      target.errorSync("hello");
      target.fatalSync("hello");
      expect(writer.toString()).toBe(
        [
          `${Formatter.toISOStringWithTimezone(timestamp())} [WARN] hello\n`,
          `${Formatter.toISOStringWithTimezone(timestamp())} [ERROR] hello\n`,
          `${Formatter.toISOStringWithTimezone(timestamp())} [FATAL] hello\n`,
        ].join(""),
      );
    });

    test("level=levelError, outputs `error`, `fatal` log(s)", () => {
      const writer = new Writer.StringWriter();
      const options = {
        level: Logger.levelError,
        writer: writer,
        timestamp: timestamp,
      };

      const target = new Logger.Logger(options);
      target.debugSync("hello");
      target.infoSync("hello");
      target.warnSync("hello");
      target.errorSync("hello");
      target.fatalSync("hello");
      expect(writer.toString()).toBe(
        [
          `${Formatter.toISOStringWithTimezone(timestamp())} [ERROR] hello\n`,
          `${Formatter.toISOStringWithTimezone(timestamp())} [FATAL] hello\n`,
        ].join(""),
      );
    });

    test("level=levelFatal, outputs `fatal` log(s)", () => {
      const writer = new Writer.StringWriter();
      const options = {
        level: Logger.levelFatal,
        writer: writer,
        timestamp: timestamp,
      };

      const target = new Logger.Logger(options);
      target.debugSync("hello");
      target.infoSync("hello");
      target.warnSync("hello");
      target.errorSync("hello");
      target.fatalSync("hello");
      expect(writer.toString()).toBe(
        [
          `${Formatter.toISOStringWithTimezone(timestamp())} [FATAL] hello\n`,
        ].join(""),
      );
    });
  });
});
