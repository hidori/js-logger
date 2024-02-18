import { jest } from "@jest/globals";

import * as Presenter from "./presenter.js";

describe("class Presenter", () => {
  describe("printf()", () => {
    test("calls formatter.format() and writer.write()", async () => {
      const timestamp = new Date();
      const formatter = {
        format: jest.fn((timestamp, level, data) => {
          expect(timestamp).toBe(timestamp);
          expect(level).toBe("printf.args.level");
          expect(data).toBe("printf.args.data");
          return "format.returnValue";
        }),
      };
      const writer = {
        write: jest.fn(() => {
          return {
            func: (text) => {
              expect(text).toBe("format.returnValue");
            },
          };
        }),
      };

      const target = new Presenter.Presenter(formatter, writer);
      await target.printf(timestamp, "printf.args.level", "printf.args.data");
      expect(formatter.format.mock.calls.length).toBe(1);
      expect(writer.write.mock.calls.length).toBe(1);
    });
  });

  describe("printfSync()", () => {
    test("calls formatter.format() and writer.writeSync()", () => {
      const timestamp = new Date();
      const formatter = {
        format: jest.fn((timestamp, level, data) => {
          expect(timestamp).toBe(timestamp);
          expect(level).toBe("printf.args.level");
          expect(data).toBe("printf.args.data");
          return "format.returnValue";
        }),
      };
      const writer = {
        writeSync: jest.fn((data) => {
          expect(data).toBe("format.returnValue");
        }),
      };

      const target = new Presenter.Presenter(formatter, writer);
      target.printfSync(timestamp, "printf.args.level", "printf.args.data");
      expect(formatter.format.mock.calls.length).toBe(1);
      expect(writer.writeSync.mock.calls.length).toBe(1);
    });
  });
});
