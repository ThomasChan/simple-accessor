/**
 * @file Gets the value at `path` of `object`/`array`. If the resolved value is
 * `undefined` or `null`, the `defaultValue` is returned in its place.
 * @author ThomasChan
 * @param {Object|Array} object The object to query.
 * @param {string} path The path of the property to get.
 * @param {*} [defaultValue] The value returned for `undefined` `null` resolved values.
 * @returns {*} Returns the resolved value.
 * @example
 *
 * const object = { 'a': [{ 'b': { 'c': 3 } }] }
 *
 * get(object, 'a.0.b.c')
 * // => 3
 *
 * get(object, 'a.b.c', 'default')
 * // => 'default'
 */

interface NumericDictionary<T> {
  [index: number]: T;
}
type Many<T> = T | ReadonlyArray<T>;
type PropertyName = string | number | symbol;
type PropertyPath = Many<PropertyName>;

type FieldWithPossiblyUndefined<T, Key> =
  | GetFieldType<Exclude<T, undefined>, Key>
  | Extract<T, undefined>;

type GetIndexedField<T, K> = K extends keyof T
  ? T[K]
  : K extends `${number}`
  ? '0' extends keyof T
  ? undefined
  : number extends keyof T
  ? T[number]
  : undefined
  : undefined;

type IndexedFieldWithPossiblyUndefined<T, Key> =
  | GetIndexedField<Exclude<T, undefined>, Key>
  | Extract<T, undefined>;

type GetFieldType<T, P> = P extends `${infer Left}.${infer Right}`
  ? Left extends keyof T
  ? FieldWithPossiblyUndefined<T[Left], Right>
  : Left extends `${infer FieldKey}[${infer IndexKey}]`
  ? FieldKey extends keyof T
  ? FieldWithPossiblyUndefined<IndexedFieldWithPossiblyUndefined<T[FieldKey], IndexKey>, Right>
  : undefined
  : undefined
  : P extends keyof T
  ? T[P]
  : P extends `${infer FieldKey}[${infer IndexKey}]`
  ? FieldKey extends keyof T
  ? IndexedFieldWithPossiblyUndefined<T[FieldKey], IndexKey>
  : undefined
  : undefined;

function simpleGet<TObject extends object, TKey extends keyof TObject>(object: TObject, path: TKey | [TKey]): TObject[TKey];
function simpleGet<TObject extends object, TKey extends keyof TObject>(object: TObject | null | undefined, path: TKey | [TKey]): TObject[TKey] | undefined;
function simpleGet<TObject extends object, TKey extends keyof TObject, TDefault>(object: TObject | null | undefined, path: TKey | [TKey], defaultValue: TDefault): Exclude<TObject[TKey], undefined> | TDefault;
function simpleGet<TObject extends object, TKey1 extends keyof TObject, TKey2 extends keyof TObject[TKey1]>(object: TObject, path: [TKey1, TKey2]): TObject[TKey1][TKey2];
function simpleGet<TObject extends object, TKey1 extends keyof TObject, TKey2 extends keyof TObject[TKey1]>(object: TObject | null | undefined, path: [TKey1, TKey2]): TObject[TKey1][TKey2] | undefined;
function simpleGet<TObject extends object, TKey1 extends keyof TObject, TKey2 extends keyof TObject[TKey1], TDefault>(object: TObject | null | undefined, path: [TKey1, TKey2], defaultValue: TDefault): Exclude<TObject[TKey1][TKey2], undefined> | TDefault;
function simpleGet<TObject extends object, TKey1 extends keyof TObject, TKey2 extends keyof TObject[TKey1], TKey3 extends keyof TObject[TKey1][TKey2]>(object: TObject, path: [TKey1, TKey2, TKey3]): TObject[TKey1][TKey2][TKey3];
function simpleGet<TObject extends object, TKey1 extends keyof TObject, TKey2 extends keyof TObject[TKey1], TKey3 extends keyof TObject[TKey1][TKey2]>(object: TObject | null | undefined, path: [TKey1, TKey2, TKey3]): TObject[TKey1][TKey2][TKey3] | undefined;
function simpleGet<TObject extends object, TKey1 extends keyof TObject, TKey2 extends keyof TObject[TKey1], TKey3 extends keyof TObject[TKey1][TKey2], TDefault>(object: TObject | null | undefined, path: [TKey1, TKey2, TKey3], defaultValue: TDefault): Exclude<TObject[TKey1][TKey2][TKey3], undefined> | TDefault;
function simpleGet<TObject extends object, TKey1 extends keyof TObject, TKey2 extends keyof TObject[TKey1], TKey3 extends keyof TObject[TKey1][TKey2], TKey4 extends keyof TObject[TKey1][TKey2][TKey3]>(object: TObject, path: [TKey1, TKey2, TKey3, TKey4]): TObject[TKey1][TKey2][TKey3][TKey4];
function simpleGet<TObject extends object, TKey1 extends keyof TObject, TKey2 extends keyof TObject[TKey1], TKey3 extends keyof TObject[TKey1][TKey2], TKey4 extends keyof TObject[TKey1][TKey2][TKey3]>(object: TObject | null | undefined, path: [TKey1, TKey2, TKey3, TKey4]): TObject[TKey1][TKey2][TKey3][TKey4] | undefined;
function simpleGet<TObject extends object, TKey1 extends keyof TObject, TKey2 extends keyof TObject[TKey1], TKey3 extends keyof TObject[TKey1][TKey2], TKey4 extends keyof TObject[TKey1][TKey2][TKey3], TDefault>(object: TObject | null | undefined, path: [TKey1, TKey2, TKey3, TKey4], defaultValue: TDefault): Exclude<TObject[TKey1][TKey2][TKey3][TKey4], undefined> | TDefault;
function simpleGet<T>(object: NumericDictionary<T>, path: number): T;
function simpleGet<T>(object: NumericDictionary<T> | null | undefined, path: number): T | undefined;
function simpleGet<T, TDefault>(object: NumericDictionary<T> | null | undefined, path: number, defaultValue: TDefault): T | TDefault;
function simpleGet<TDefault>(object: null | undefined, path: PropertyPath, defaultValue: TDefault): TDefault;
function simpleGet(object: null | undefined, path: PropertyPath): undefined;
function simpleGet<TObject, TPath extends string>(data: TObject, path: TPath): string extends TPath ? any : GetFieldType<TObject, TPath>;
function simpleGet<TObject, TPath extends string, TDefault = GetFieldType<TObject, TPath>>(data: TObject, path: TPath, defaultValue: TDefault): Exclude<GetFieldType<TObject, TPath>, null | undefined> | TDefault;
function simpleGet(object: any, path: PropertyPath, defaultValue?: any): any;

function simpleGet<T extends object, K extends string>(obj: T, path: K, defaultValue?: T) {
  if (obj === undefined
    || obj === null
    || typeof path !== 'string') {
    if (defaultValue !== undefined) {
      return defaultValue;
    }
    return undefined;
  }
  if (path.indexOf('.') < 0) {
    obj = obj?.[path as unknown as keyof T] as unknown as T;
    if (obj === undefined || obj === null) {
      return defaultValue !== undefined ? defaultValue : obj;
    }
    return obj;
  }
  const { length } = path;
  let charStart = 0;
  for (let i = 0; i <= length; i++) {
    if (path[i] === '.' || i === length) {
      obj = obj?.[path.substring(charStart, i) as unknown as keyof T] as T;
      if (obj === undefined || obj === null) {
        return defaultValue !== undefined ? defaultValue : obj;
      }
      charStart = i + 1;
    }
  }
  return obj;
}

export default simpleGet;
