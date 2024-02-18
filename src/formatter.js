export class TextFormatter {
  format(timestamp, level, data) {
    return `${toISOStringWithTimezone(timestamp)} [${level.toUpperCase()}] ${data}`;
  }
}

export class JSONFormatter {
  constructor(replacer, space) {
    this.#replacer = replacer;
    this.#space = space;
  }

  #replacer;
  #space;

  format(timestamp, level, data) {
    return JSON.stringify(
      {
        timestamp: toISOStringWithTimezone(timestamp),
        level: level,
        data: data,
      },
      this.#replacer,
      this.#space,
    );
  }
}

export function toISOStringWithTimezone(date) {
  const year = date.getFullYear().toString().padStart(4, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");
  const milliseconds = date.getMilliseconds().toString().padStart(3, "0");
  const offset = date.getTimezoneOffset();
  const tzHour = Math.floor(Math.abs(offset) / 60)
    .toString()
    .padStart(2, "0");
  const tzMinute = (Math.abs(offset) % 60).toString().padStart(2, "0");
  const tzSign = offset > 0 ? "-" : "+";
  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}${tzSign}${tzHour}:${tzMinute}`;
}
