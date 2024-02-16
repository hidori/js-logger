import * as Logger from "./logger.js";

describe("Logger.xxx()", () => {
  const formatter = new Logger.TextFormatter();
  const now = () => new Date(Date.UTC(2024, 2, 16));

  test("levelNone", () => {
    const writer = new Logger.StringWriter();
    const target = new Logger.Logger({
      level: Logger.levelNone,
      presenter: new Logger.Presenter(formatter, writer),
      now: now,
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
      now: now,
    });

    target.debug("hello");
    target.info("hello");
    target.warn("hello");
    target.error("hello");
    target.fatal("hello");
    expect(writer.toString()).toBe(
      [
        `${Logger.toISOStringWithTimezone(now())} [DEBUG] hello\n`,
        `${Logger.toISOStringWithTimezone(now())} [INFO] hello\n`,
        `${Logger.toISOStringWithTimezone(now())} [WARN] hello\n`,
        `${Logger.toISOStringWithTimezone(now())} [ERROR] hello\n`,
        `${Logger.toISOStringWithTimezone(now())} [FATAL] hello\n`,
      ].join(""),
    );
  });

  test("levelInfo", () => {
    const writer = new Logger.StringWriter();
    const target = new Logger.Logger({
      level: Logger.levelInfo,
      presenter: new Logger.Presenter(formatter, writer),
      now: now,
    });

    target.debug("hello");
    target.info("hello");
    target.warn("hello");
    target.error("hello");
    target.fatal("hello");
    expect(writer.toString()).toBe(
      [
        `${Logger.toISOStringWithTimezone(now())} [INFO] hello\n`,
        `${Logger.toISOStringWithTimezone(now())} [WARN] hello\n`,
        `${Logger.toISOStringWithTimezone(now())} [ERROR] hello\n`,
        `${Logger.toISOStringWithTimezone(now())} [FATAL] hello\n`,
      ].join(""),
    );
  });

  test("levelWarn", () => {
    const writer = new Logger.StringWriter();
    const target = new Logger.Logger({
      level: Logger.levelWarn,
      presenter: new Logger.Presenter(formatter, writer),
      now: now,
    });

    target.debug("hello");
    target.info("hello");
    target.warn("hello");
    target.error("hello");
    target.fatal("hello");
    expect(writer.toString()).toBe(
      [
        `${Logger.toISOStringWithTimezone(now())} [WARN] hello\n`,
        `${Logger.toISOStringWithTimezone(now())} [ERROR] hello\n`,
        `${Logger.toISOStringWithTimezone(now())} [FATAL] hello\n`,
      ].join(""),
    );
  });

  test("levelError", () => {
    const writer = new Logger.StringWriter();
    const target = new Logger.Logger({
      level: Logger.levelError,
      presenter: new Logger.Presenter(formatter, writer),
      now: now,
    });

    target.debug("hello");
    target.info("hello");
    target.warn("hello");
    target.error("hello");
    target.fatal("hello");
    expect(writer.toString()).toBe(
      [
        `${Logger.toISOStringWithTimezone(now())} [ERROR] hello\n`,
        `${Logger.toISOStringWithTimezone(now())} [FATAL] hello\n`,
      ].join(""),
    );
  });

  test("levelFatal", () => {
    const writer = new Logger.StringWriter();
    const target = new Logger.Logger({
      level: Logger.levelFatal,
      presenter: new Logger.Presenter(formatter, writer),
      now: now,
    });

    target.debug("hello");
    target.info("hello");
    target.warn("hello");
    target.error("hello");
    target.fatal("hello");
    expect(writer.toString()).toBe(
      [`${Logger.toISOStringWithTimezone(now())} [FATAL] hello\n`].join(""),
    );
  });
});
