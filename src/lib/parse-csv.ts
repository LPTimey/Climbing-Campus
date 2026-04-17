type ParseCsvOptions<T> = {
  delimiter?: string;
  hasHeaders?: boolean;
  trim?: boolean;
  parsers: {
    [K in keyof T]: (value: string) => T[K];
  };
};

export function parseCsv<T extends Record<string, any>>(
  text: string,
  options: ParseCsvOptions<T>,
): T[] {
  const { delimiter = ",", hasHeaders = true, trim = true, parsers } = options;
  const parserKeys = Object.keys(parsers) as (keyof typeof parsers)[];

  const lines = text.split(/\r?\n/).filter((line) => line.trim().length > 0);
  if (lines.length === 0) return [];

  const startIndex = hasHeaders ? 1 : 0;

  const result: T[] = [];

  for (let i = startIndex; i < lines.length; i++) {
    const line = lines[i];
    const data = line.split(delimiter);
    if (data.length !== parserKeys.length) {
      throw new Error("");
    }

    const obj: Partial<T> = {};

    for (let j = 0; j < parserKeys.length; j++) {
      const raw = trim ? data[j].trim() : data[j];
      const key = parserKeys[j];
      obj[key] = parsers[key](raw);
    }

    result.push(obj as T);
  }

  return result;
}
