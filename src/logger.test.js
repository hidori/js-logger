import { jest } from "@jest/globals";
import * as Logger from "./logger.js";

const now = new Date(Date.UTC(2024, 2, 16));

describe("class Logger", () => {
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
});

describe("class Presenter", () => {
  describe("printf()", () => {
    test("calls formatter.fomat() and writer.write()", () => {
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
});

describe("class TextFormatter", () => {
  describe("formt()", () => {
    const target = new Logger.TextFormatter();

    expect(target.format(now, "format.level", "format.data")).toBe(
      "2024-03-16T09:00:00+09:00 [FORMAT.LEVEL] format.data",
    );
  });
});

describe("class JSONFormatter", () => {
  describe("formt()", () => {
    const target = new Logger.JSONFormatter();

    expect(target.format(now, "format.level", "format.data")).toBe(
      JSON.stringify({
        timestamp: Logger.toISOStringWithTimezone(now),
        level: "format.level",
        data: "format.data",
      }),
    );
  });
});

describe("class ConsoleWriter", () => {
  describe("write()", () => {
    // TODO:
  });
});

describe("class FileWriter", () => {
  describe("write()", () => {
    // TODO:
  });
});

describe("class StringWriter", () => {
  describe("write() and toString()", () => {
    const target = new Logger.StringWriter();

    target.write("1");
    target.write("2");
    target.write("3");
    expect(target.toString()).toBe("1\n2\n3\n");
  });
});

describe("class ConsoleWriter", () => {
  describe("write()", () => {
    // TODO:
  });
});

describe("function", () => {
  describe("toISOStringWithTimezone()", () => {
    // TODO:
  });
});
