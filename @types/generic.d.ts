type LowerToUpperToLowerCaseMapper = {
  a: "A";
  b: "B";
  c: "C";
  d: "D";
  e: "E";
  f: "F";
  g: "G";
  h: "H";
  i: "I";
  j: "J";
  k: "K";
  l: "L";
  m: "M";
  n: "N";
  o: "O";
  p: "P";
  q: "Q";
  r: "R";
  s: "S";
  t: "T";
  u: "U";
  v: "V";
  w: "W";
  x: "X";
  y: "Y";
  z: "Z";
};
type UpperToLowerCaseMapper = {
  A: "a";
  B: "b";
  C: "c";
  D: "d";
  E: "e";
  F: "f";
  G: "g";
  H: "h";
  I: "i";
  J: "j";
  K: "k";
  L: "l";
  M: "m";
  N: "n";
  O: "o";
  P: "p";
  Q: "q";
  R: "r";
  S: "s";
  T: "t";
  U: "u";
  V: "v";
  W: "w";
  X: "x";
  Y: "y";
  Z: "z";
};
type HeadLetter<T> = T extends `${infer FirstLetter}${infer _Rest}`
  ? FirstLetter
  : never;
type TailLetters<T> = T extends `${infer _FirstLetter}${infer Rest}`
  ? Rest
  : never;
type LetterToUpper<T> = T extends `${infer FirstLetter}${infer _Rest}`
  ? FirstLetter extends keyof LowerToUpperToLowerCaseMapper
    ? LowerToUpperToLowerCaseMapper[FirstLetter]
    : FirstLetter
  : T;
type LetterToLower<T> = T extends `${infer FirstLetter}${infer _Rest}`
  ? FirstLetter extends keyof UpperToLowerCaseMapper
    ? UpperToLowerCaseMapper[FirstLetter]
    : FirstLetter
  : T;
type ToLowerCase<T> = T extends ""
  ? T
  : `${LetterToLower<HeadLetter<T>>}${ToLowerCase<TailLetters<T>>}`;
type ToSentenceCase<T> = `${LetterToUpper<HeadLetter<T>>}${ToLowerCase<
  TailLetters<T>
>}`;
type IPath = Record<"params" | "query", any>;
type IPathToBuilder<T, L extends string> = {
  [K in keyof T as K extends `${infer I}`
    ? `${L}${ToSentenceCase<I>}`
    : K]-?: T[K];
};
type FormatBuilder<T extends IPath> = IPathToBuilder<T["params"], "setParam"> &
  IPathToBuilder<T["query"], "setQuery">;
type Builder<T> = {
  [k in keyof T]-?: (arg: T[k]) => Builder<T>;
} & {
  build(): T;
};
type SuperBuilder<T extends IPath> = Builder<FormatBuilder<T>>;

type Join<K, P> = K extends string | number
  ? P extends string | number
    ? `${K}${"" extends P ? "" : "."}${P}`
    : never
  : never;

type Prev = [never, 0, 1, 2, 3, 4, ...0[]];
type LessPrev = [never, 0, 1, 2, 3, 4, ...0[]];

type Paths<T, D extends number = 10> = [D] extends [never]
  ? never
  : T extends object
  ? {
      [K in keyof T]-?: K extends string | number
        ? `${K}` | Join<K, Paths<T[K], Prev[D]>>
        : never;
    }[keyof T]
  : "";

type LessPaths<T, D extends number = 5> = [D] extends [never]
  ? never
  : T extends object
  ? {
      [K in keyof T]-?: K extends string | number
        ? `${K}` | Join<K, Paths<T[K], LessPrev[D]>>
        : never;
    }[keyof T]
  : "";

type Leaves<T, D extends number = 10> = [D] extends [never]
  ? never
  : T extends object
  ? { [K in keyof T]-?: Join<K, Leaves<T[K], Prev[D]>> }[keyof T]
  : "";

type NestedObjectPaths<T> = Paths<T>;

type NestedObjectLessPaths<T> = LessPaths<T>;

type Assignable<Obj, Item> = {
  [Key in keyof Obj]: Obj[Key] extends Item ? Key : never;
}[keyof Obj];
