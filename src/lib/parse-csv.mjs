"use strict";
/**
  @template T
  @typedef {
    {
      delimiter?: string;
      hasHeaders?: boolean;
      trim?: boolean;
      parsers: {
        [K in keyof T]: (value: string) => T[K];
      };
    }
  } ParseCsvOptions
 */

/**
 *
 * @template {Record<string, any>} T
 * @param {string} text
 * @param {ParseCsvOptions<T>} options
 * @returns
 */
export function parseCsv(text, options) {
  const { delimiter = ",", hasHeaders = true, trim = true, parsers } = options;
  /** @type {(keyof T)[]} */
  const parserKeys = Object.keys(parsers);

  const lines = text.split(/\r?\n/).filter((line) => line.trim().length > 0);
  if (lines.length === 0) return [];

  const startIndex = hasHeaders ? 1 : 0;

  /** @type {T[]} */
  const result = [];

  for (let i = startIndex; i < lines.length; i++) {
    const line = lines[i];
    const data = line.split(delimiter);
    if (data.length !== parserKeys.length) {
      throw new Error("");
    }

    /** @type {Partial<T>} */
    const obj = {};

    for (let j = 0; j < parserKeys.length; j++) {
      const raw = trim ? data[j].trim() : data[j];
      const key = parserKeys[j];
      obj[key] = parsers[key](raw);
    }

    result.push(/** @type {T} */ (obj));
  }

  return result;
}
