import * as Writer from "./writer.js";

describe("class StringWriter", () => {
  describe("write()", () => {
    test("returns write() and toString()", () => {
      const target = new Writer.StringWriter();

      target.write("1");
      target.write("2");
      target.write("3");
      expect(target.toString()).toBe("1\n2\n3\n");
    });

    describe("writeSync()", () => {
      test("returns write() and toString()", () => {
        const target = new Writer.StringWriter();

        target.write("1");
        target.write("2");
        target.write("3");
        expect(target.toString()).toBe("1\n2\n3\n");
      });
    });
  });
});

describe("class ConsoleWriter", () => {
  test.skip("write()", () => {
    // TODO:
  });

  test.skip("writeSync()", () => {
    // TODO:
  });
});
