// --- Imports -------------------------------------------------------------- //

import { Expect, Test, TestFixture } from 'alsatian';
import { refineDeep } from '../../src/lib';

// -------------------------------------------------------------------------- //

@TestFixture('Shallow Tests')
export class ShallowTestFixture {
  @Test('Cleans `undefined`')
  public cleansUndefinedTest() {
    const obj = refineDeep({ foo: { bar: undefined, baz: 'hello' } });
    Expect(Object.keys(obj.foo as any)).toEqual(['baz']);
  }

  // @Test('Cleans `null`')
  // public cleansNullTest() {
  //   const obj = refineDeep({ foo: 'hello', bar: null });
  //   Expect(Object.keys(obj)).toEqual(['foo']);
  // }

  // @Test('Cleans `undefined` but not `null`')
  // public cleansUndefinedButNotNullTest() {
  //   const obj = refineDeep({ foo: null, bar: undefined }, { ignoreNull: true });
  //   Expect(Object.keys(obj)).toEqual(['foo']);
  // }

  // @Test('Cleans `null` but not `undefined`')
  // public cleansNullButNotUndefinedTest() {
  //   const obj = refineDeep(
  //     { foo: null, bar: undefined },
  //     { ignoreUndefined: true },
  //   );
  //   Expect(Object.keys(obj)).toEqual(['bar']);
  // }

  // @Test('Cleans empty strings')
  // public cleansEmptyStringsTest() {
  //   const obj = refineDeep({ foo: 'hello', bar: '' });
  //   Expect(Object.keys(obj)).toEqual(['foo']);
  // }

  // @Test('Keeps empty strings')
  // public keepsEmptyStringsTest() {
  //   const obj = refineDeep(
  //     { foo: 'hello', bar: '' },
  //     { ignoreEmptyStrings: true },
  //   );
  //   Expect(Object.keys(obj)).toEqual(['foo', 'bar']);
  // }

  // @Test('Cleans empty arrays')
  // public cleansEmptyArraysTest() {
  //   const obj = refineDeep({ foo: 'hello', bar: [] });
  //   Expect(Object.keys(obj)).toEqual(['foo']);
  // }

  // @Test('Keeps empty arrays')
  // public keepsEmptyArraysTest() {
  //   const obj = refineDeep(
  //     { foo: 'hello', bar: [] },
  //     { ignoreEmptyArrays: true },
  //   );
  //   Expect(Object.keys(obj)).toEqual(['foo', 'bar']);
  // }

  // @Test('Cleans empty objects')
  // public cleansEmptyObjectsTest() {
  //   const obj = refineDeep({ foo: 'hello', bar: {} });
  //   Expect(Object.keys(obj)).toEqual(['foo']);
  // }

  // @Test('Keeps empty objects')
  // public keepsEmptyObjectsTest() {
  //   const obj = refineDeep(
  //     { foo: 'hello', bar: {} },
  //     { ignoreEmptyObjects: true },
  //   );
  //   Expect(Object.keys(obj)).toEqual(['foo', 'bar']);
  // }

  // @Test('Cleans zeros')
  // public cleansZerosTest() {
  //   const obj = refineDeep({ foo: 'hello', bar: 0 });
  //   Expect(Object.keys(obj)).toEqual(['foo']);
  // }

  // @Test('Keeps zeros')
  // public keepsZerosTest() {
  //   const obj = refineDeep({ foo: 'hello', bar: 0 }, { ignoreZeros: true });
  //   Expect(Object.keys(obj)).toEqual(['foo', 'bar']);
  // }
}
