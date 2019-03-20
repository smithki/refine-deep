// --- Imports -------------------------------------------------------------- //

import { RefineOptions } from './types';

// --- Assertion helpers ---------------------------------------------------- //

const filterObj = (obj: any, predicate: any) =>
  Object.keys(obj)
    .filter(key => predicate(obj[key]))
    .reduce((result, key) => Object.assign(result, { [key]: obj[key] }), {});

function getObjectTag(value: any) {
  return Object.prototype.toString.call(value);
}

function assertObjectTag(check: string, value: any) {
  const tagRegExp = /\[object (\w+)\]/;
  const tag = tagRegExp.test(check) ? check.replace(tagRegExp, '$1') : check;
  return getObjectTag(value) === `[object ${tag}]`;
}

const isArray = Array.isArray;
const isIterable = (value: any) =>
  typeof (value && value[Symbol.iterator]) === 'function';
const isFunction = (value: any) => typeof value === 'function';
const isNumber = (value: any) => typeof value === 'number';
const isString = (value: any) => typeof value === 'string';
const isNull = (value: any) => value === null;
const isUndefined = (value: any) => typeof value === 'undefined';
const isNil = (value: any) => isNull(value) || isUndefined(value);
const isObject = (value: any) => typeof value === 'object';
const isPlainObject = (value: any) => {
  if (!isObject(value) || !assertObjectTag('Object', value)) return false;
  if (isNull(Object.getPrototypeOf(value))) return true;

  let proto = value;
  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }

  return Object.getPrototypeOf(value) === proto;
};

function isEmpty(value: any) {
  if (isNil(value)) return true;
  if (isIterable(value)) return value[Symbol.iterator]().next().done;
  if (isObject(value)) return !Object.keys(value).length;
  return !value;
}

function predicate(options: RefineOptions) {
  return (value: any) => {
    // Ignore functions
    if (isFunction(value)) return true;

    // Type assertions
    const number = isNumber(value);
    const string = isString(value);
    const array = isArray(value);
    const object = isPlainObject(value);

    // Test for nil values
    const nullVal = !options.ignoreNull && isNull(value);
    const undefinedVal = !options.ignoreUndefined && isUndefined(value);
    const nil = !options.ignoreNil && (nullVal || undefinedVal);

    // Test for empty values
    const empty = isEmpty(value);
    const emptyString = !options.ignoreEmptyStrings && (empty && string);
    const emptyArray = !options.ignoreEmptyArrays && (empty && array);
    const emptyObject = !options.ignoreEmptyObjects && (empty && object);
    const emptyAny =
      !options.ignoreEmptyAny && (emptyString || emptyArray || emptyObject);

    // Test for zeros
    const zero = !options.ignoreZeros && (number && value === 0);

    // Result of nil / empty / zero tests
    return !(nil || emptyAny || zero);
  };
}

// --- Main business logic -------------------------------------------------- //

/**
 * Create a streamlined object free of null, undefined, empty strings, empty
 * arrays, or empty objects.
 *
 * @param collection The collection (object or array) to clean.
 * @param options Customize which nil or empty values will be omitted.
 */
export function refine<T extends object>(
  collection: T,
  options: RefineOptions = {},
): Partial<T> {
  // If collection is function, return as is.
  if (isFunction(collection)) {
    return collection;
  }

  // If collection is array, return omitted values in a new array.
  if (isArray(collection)) {
    return collection.filter(predicate(options)) as any;
  }

  // If collection is object (and not array), return values in a new object.
  if (isPlainObject(collection)) {
    return filterObj(collection, predicate(options));
  }

  // If collection is any other type, return as is. In TypeScript, this should
  // be unreachable unless a collection is cast to 'any'.
  return collection;
}

/**
 * Recursively create a streamlined object free of null, undefined, empty
 * strings, empty arrays, or empty objects.
 *
 * @param collection The collection (object or array) to refine deeply.
 * @param options Customize which nil or empty values will be omitted.
 */
export function refineDeep<T extends object>(
  collection: T,
  options: RefineOptions = {},
): Partial<T> {
  const result: any = collection;

  for (const i in result) {
    let value = result[i]; // Save a reference to the current value.
    // Execute refine() on current value.
    value = refine(value, options);
    // If value is object (including array), recurse deeply.
    if (isObject(value)) {
      value = refineDeep(value, options);
    }
    result[i] = value; // Apply the transformed value.
  }

  // Execute refine() at the top level and return result.
  return refine(result, options) as Partial<T>;
}
