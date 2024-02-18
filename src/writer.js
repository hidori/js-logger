export class StringWriter {
  #str = "";

  async write(text) {
    this.writeSync(text);
  }

  writeSync(text) {
    this.#str = `${this.#str}${text}\n`;
  }

  toString() {
    return this.#str;
  }
}

export class ConsoleWriter {
  async write(text) {
    this.writeSync(text);
  }

  writeSync(text) {
    console.log(text);
  }
}
