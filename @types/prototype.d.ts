interface Array<T> {
  /**
   * @return sum of this number array
   * @example
   * [{v: 1}, {v: 2}, {v: 3}].map(item => item.v).sum()
   */
  sum(valGetter: (item: T) => number | false | undefined | null): number;
  /**
   * @return random item of this array
   * @example
   * ["voz", "wibu", "MU"].getRandomItem()
   * --> "MU"
   */
  getRandomItem(): T;
  /**
   * @param item - item has same type with array
   * @param isEqual - a function to check if when 2 item equals
   * @return boolean - true if item in this array
   * @example
   * [{fan: "MU", fan: "VOZ"}].has({fan: "Wibu"}, (a, b) => a.fan === b.fan)
   */
  has(item: T, isEqual?: (a: T, b: T) => boolean);

  /**
   * @return an array has items grouped
   * @example
   * [{ name: "John", family: "a"}, {name: "Alice", family: "a"}, { name: "Nick", family: "b"}]
   *  -> [
   *    [{ name: "John", family: "a"}, {name: "Alice", family: "a"}],
   *    [{ name: "Nick", family: "b"}]
   *  ]
   */
  groupBy(getGroupValue: (item: T) => string | number): T[][];
  last(): T | undefined;
}

declare interface Number {
  compact(): number;
  toPrice(): string;
  toPercent(): string;
  toFormatNumber(): string;
}

declare interface String {
  /**
   * @return string - Date formatted (MM/DD/YYYY)
   * @example
   * "2022-08-16T07:52:23.929Z".prettyDate() -> "8/16/2022"
   */
  prettyDate(): string;
  /**
   * @return string with capitalized first character
   * @example
   * "john abc".capitalized() -> "John abc"
   */
  capitalized(): string;
  /**
   * @return formatted string
   * @example
   * "IPhone XXL *@@ -- abc3".toSlug()
   * --> "iphone-xxl-abc3"
   */
  toSlug(): string;
  toFormatNumber(): string;

  trimPhone(): string;
}

declare interface Date {
  /**
   * @return string - Date formatted (MM/DD/YYYY)
   * @example
   * "2022-08-16T07:52:23.929Z".prettyDate() -> "8/16/2022"
   */
  prettyDate(): string;

  prettyDateTime(): string;
}
