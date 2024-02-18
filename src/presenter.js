export class Presenter {
  constructor(formatter, writer) {
    this.#formatter = formatter;
    this.#writer = writer;
  }

  #formatter;
  #writer;

  async printf(timestamp, level, data) {
    await this.#writer.write(this.#formatter.format(timestamp, level, data));
  }

  printfSync(timestamp, level, data) {
    this.#writer.writeSync(this.#formatter.format(timestamp, level, data));
  }
}
