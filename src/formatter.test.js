import { jest } from '@jest/globals';

import * as Formatter from './formatter.js';

describe('class TextFormatter', () => {
  describe('format()', () => {
    test('returns text', () => {
      mockDate(2024, 0, 2, 3, 4, 5, 6, -540, () => {
        const target = new Formatter.TextFormatter();
        expect(target.format(new Date(), 'args.level', 'args.data')).toBe(
          '2024-01-02T03:04:05.006+09:00 [ARGS.LEVEL] args.data',
        );
      });
    });
  });

  describe('class JSONFormatter', () => {
    describe('formt()', () => {
      test('returns json', () => {
        mockDate(2024, 0, 2, 3, 4, 5, 6, -540, () => {
          const target = new Formatter.JSONFormatter();
          expect(target.format(new Date(), 'args.level', 'args.data')).toBe(
            JSON.stringify({
              timestamp: '2024-01-02T03:04:05.006+09:00',
              level: 'args.level',
              data: 'args.data',
            }),
          );
        });
      });

      test('returns json only has `timestamp` property, and indented', () => {
        mockDate(2024, 0, 2, 3, 4, 5, 6, -540, () => {
          const target = new Formatter.JSONFormatter(['timestamp'], 4);
          expect(target.format(new Date(), 'args.level', 'args.data')).toBe(
            '{\n    "timestamp": "2024-01-02T03:04:05.006+09:00"\n}',
          );
        });
      });
    });
  });

  describe('functions', () => {
    describe('toISOStringWithTimezone()', () => {
      test('offset=0, returns TimezoneOffset=`+00:00`', () => {
        mockDate(2024, 0, 2, 3, 4, 5, 6, 0, () => {
          expect(Formatter.toISOStringWithTimezone(new Date())).toBe(
            '2024-01-02T03:04:05.006+00:00',
          );
        });
      });

      test('offset=0, returns TimezoneOffset=`+09:00`', () => {
        mockDate(2024, 0, 2, 3, 4, 5, 6, -540, () => {
          expect(Formatter.toISOStringWithTimezone(new Date())).toBe(
            '2024-01-02T03:04:05.006+09:00',
          );
        });
      });

      test('offset=0, returns TimezoneOffset=`-09:30`', () => {
        mockDate(2024, 0, 2, 3, 4, 5, 6, 570, () => {
          expect(Formatter.toISOStringWithTimezone(new Date())).toBe(
            '2024-01-02T03:04:05.006-09:30',
          );
        });
      });
    });
  });
});

function mockDate(
  year,
  month,
  date,
  hours,
  minutess,
  seconds,
  milliseconds,
  offset,
  fc,
) {
  const mock = {
    getFullYear: jest.spyOn(Date.prototype, 'getFullYear'),
    getMonth: jest.spyOn(Date.prototype, 'getMonth'),
    getDate: jest.spyOn(Date.prototype, 'getDate'),
    getHours: jest.spyOn(Date.prototype, 'getHours'),
    getMinutes: jest.spyOn(Date.prototype, 'getMinutes'),
    getSeconds: jest.spyOn(Date.prototype, 'getSeconds'),
    getMilliseconds: jest.spyOn(Date.prototype, 'getMilliseconds'),
    getTimezoneOffset: jest.spyOn(Date.prototype, 'getTimezoneOffset'),
  };

  mock.getFullYear.mockImplementation(() => year);
  mock.getMonth.mockImplementation(() => month);
  mock.getDate.mockImplementation(() => date);
  mock.getHours.mockImplementation(() => hours);
  mock.getMinutes.mockImplementation(() => minutess);
  mock.getSeconds.mockImplementation(() => seconds);
  mock.getMilliseconds.mockImplementation(() => milliseconds);
  mock.getTimezoneOffset.mockImplementation(() => offset);

  try {
    if (fc.constructor.name === 'AsyncFunction') {
      fc().then(() => undefined);
    } else {
      fc();
    }
  } finally {
    mock.getFullYear.mockRestore();
    mock.getMonth.mockRestore();
    mock.getDate.mockRestore();
    mock.getHours.mockRestore();
    mock.getMinutes.mockRestore();
    mock.getSeconds.mockRestore();
    mock.getMilliseconds.mockRestore();
    mock.getTimezoneOffset.mockRestore();
  }
}
