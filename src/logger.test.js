import { jest } from "@jest/globals";
import * as Logger from "./logger.js";

const now = new Date(Date.UTC(2024, 2, 16));

describe("Logger", () => {
  describe("xxx()", () => {
    const formatter = new Logger.TextFormatter();

    test("levelNone", () => {
      const writer = new Logger.StringWriter();
      const target = new Logger.Logger({
        level: Logger.levelNone,
        presenter: new Logger.Presenter(formatter, writer),
        now: () => new Date(Date.UTC(2024, 2, 16)),
      });

      target.debug("hello");
      target.info("hello");
      target.warn("hello");
      target.error("hello");
      target.fatal("hello");
      expect(writer.toString()).toBe("");
    });

    test("levelDebug", () => {
      const writer = new Logger.StringWriter();
      const target = new Logger.Logger({
        level: Logger.levelDebug,
        presenter: new Logger.Presenter(formatter, writer),
        now: () => new Date(Date.UTC(2024, 2, 16)),
      });

      target.debug("hello");
      target.info("hello");
      target.warn("hello");
      target.error("hello");
      target.fatal("hello");
      expect(writer.toString()).toBe(
        [
          `${Logger.toISOStringWithTimezone(now)} [DEBUG] hello\n`,
          `${Logger.toISOStringWithTimezone(now)} [INFO] hello\n`,
          `${Logger.toISOStringWithTimezone(now)} [WARN] hello\n`,
          `${Logger.toISOStringWithTimezone(now)} [ERROR] hello\n`,
          `${Logger.toISOStringWithTimezone(now)} [FATAL] hello\n`,
        ].join(""),
      );
    });

    test("levelInfo", () => {
      const writer = new Logger.StringWriter();
      const target = new Logger.Logger({
        level: Logger.levelInfo,
        presenter: new Logger.Presenter(formatter, writer),
        now: () => new Date(Date.UTC(2024, 2, 16)),
      });

      target.debug("hello");
      target.info("hello");
      target.warn("hello");
      target.error("hello");
      target.fatal("hello");
      expect(writer.toString()).toBe(
        [
          `${Logger.toISOStringWithTimezone(now)} [INFO] hello\n`,
          `${Logger.toISOStringWithTimezone(now)} [WARN] hello\n`,
          `${Logger.toISOStringWithTimezone(now)} [ERROR] hello\n`,
          `${Logger.toISOStringWithTimezone(now)} [FATAL] hello\n`,
        ].join(""),
      );
    });

    test("levelWarn", () => {
      const writer = new Logger.StringWriter();
      const target = new Logger.Logger({
        level: Logger.levelWarn,
        presenter: new Logger.Presenter(formatter, writer),
        now: () => new Date(Date.UTC(2024, 2, 16)),
      });

      target.debug("hello");
      target.info("hello");
      target.warn("hello");
      target.error("hello");
      target.fatal("hello");
      expect(writer.toString()).toBe(
        [
          `${Logger.toISOStringWithTimezone(now)} [WARN] hello\n`,
          `${Logger.toISOStringWithTimezone(now)} [ERROR] hello\n`,
          `${Logger.toISOStringWithTimezone(now)} [FATAL] hello\n`,
        ].join(""),
      );
    });

    test("levelError", () => {
      const writer = new Logger.StringWriter();
      const target = new Logger.Logger({
        level: Logger.levelError,
        presenter: new Logger.Presenter(formatter, writer),
        now: () => new Date(Date.UTC(2024, 2, 16)),
      });

      target.debug("hello");
      target.info("hello");
      target.warn("hello");
      target.error("hello");
      target.fatal("hello");
      expect(writer.toString()).toBe(
        [
          `${Logger.toISOStringWithTimezone(now)} [ERROR] hello\n`,
          `${Logger.toISOStringWithTimezone(now)} [FATAL] hello\n`,
        ].join(""),
      );
    });

    test("levelFatal", () => {
      const writer = new Logger.StringWriter();
      const target = new Logger.Logger({
        level: Logger.levelFatal,
        presenter: new Logger.Presenter(formatter, writer),
        now: () => new Date(Date.UTC(2024, 2, 16)),
      });

      target.debug("hello");
      target.info("hello");
      target.warn("hello");
      target.error("hello");
      target.fatal("hello");
      expect(writer.toString()).toBe(
        [`${Logger.toISOStringWithTimezone(now)} [FATAL] hello\n`].join(""),
      );
    });
  });
})

describe("Presenter", () => {
  describe("printf()", () => {
    test("calls formatter.fomat() ad writer.write()", () => {
      const format = jest.fn((timestamp, level, data) => {
        expect(timestamp).toBe(now);
        expect(level).toBe("printf.level");
        expect(data).toBe("printf.data");
        return "formatterOutput";
      });
      const write = jest.fn((data) => {
        expect(data).toBe("formatterOutput");
      });
      const target = new Logger.Presenter({ format: format }, { write: write });

      target.printf(now, "printf.level", "printf.data");
      expect(format.mock.calls.length).toBe(1);
      expect(write.mock.calls.length).toBe(1);
    });
  });
})
