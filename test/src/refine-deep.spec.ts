// --- Imports -------------------------------------------------------------- //

import { Expect, Test, TestFixture } from 'alsatian';
import { refineDeep } from '../../src/lib';

// -------------------------------------------------------------------------- //

@TestFixture('Recursive Tests')
export class RecursiveTestFixture {
  @Test('Cleans `undefined`')
  public cleansUndefinedTest() {
    const obj = refineDeep({ foo: { bar: undefined, baz: 'hello world' } });
    Expect(Object.keys(obj.foo as any)).toEqual(['baz']);
  }

  @Test('Cleans `null`')
  public cleansNullTest() {
    const obj = refineDeep({ foo: { bar: null, baz: 'hello world' } });
    Expect(Object.keys(obj.foo as any)).toEqual(['baz']);
  }

  @Test('Cleans `undefined` but not `null`')
  public cleansUndefinedButNotNullTest() {
    const obj = refineDeep(
      { foo: { bar: undefined, baz: null } },
      { ignoreNull: true },
    );
    Expect(Object.keys(obj.foo as any)).toEqual(['baz']);
  }

  @Test('Cleans `null` but not `undefined`')
  public cleansNullButNotUndefinedTest() {
    const obj = refineDeep(
      { foo: { bar: undefined, baz: null } },
      { ignoreUndefined: true },
    );
    Expect(Object.keys(obj.foo as any)).toEqual(['bar']);
  }

  @Test('Keeps `nil` values')
  public keepsNilValuesTest() {
    const obj = refineDeep(
      { foo: { bar: undefined, baz: null } },
      { ignoreNil: true },
    );
    Expect(Object.keys(obj.foo as any)).toEqual(['bar', 'baz']);
  }

  @Test('Keeps empty values')
  public keepsEmptyValuesTest() {
    const arr = refineDeep([[''], [{}], [[]]], { ignoreEmptyAny: true });
    Expect((arr[0] as any)[0]).toEqual('');
    Expect((arr[1] as any)[0]).toEqual({});
    Expect((arr[2] as any)[0]).toEqual([]);
    Expect(arr.length).toEqual(3);
  }

  @Test('Cleans empty strings')
  public cleansEmptyStringsTest() {
    const obj = refineDeep({ foo: { bar: '', baz: 'hello world' } });
    Expect(Object.keys(obj.foo as any)).toEqual(['baz']);
  }

  @Test('Keeps empty strings')
  public keepsEmptyStringsTest() {
    const obj = refineDeep(
      { foo: { bar: '', baz: 'hello world' } },
      { ignoreEmptyStrings: true },
    );
    Expect(Object.keys(obj.foo as any)).toEqual(['bar', 'baz']);
  }

  @Test('Cleans empty arrays')
  public cleansEmptyArraysTest() {
    const obj = refineDeep({ foo: { bar: [], baz: 'hello world' } });
    Expect(Object.keys(obj.foo as any)).toEqual(['baz']);
  }

  @Test('Keeps empty arrays')
  public keepsEmptyArraysTest() {
    const obj = refineDeep(
      { foo: { bar: [], baz: 'hello world' } },
      { ignoreEmptyArrays: true },
    );
    Expect(Object.keys(obj.foo as any)).toEqual(['bar', 'baz']);
  }

  @Test('Cleans empty objects')
  public cleansEmptyObjectsTest() {
    const obj = refineDeep({ foo: { bar: {}, baz: 'hello world' } });
    Expect(Object.keys(obj.foo as any)).toEqual(['baz']);
  }

  @Test('Keeps empty objects')
  public keepsEmptyObjectsTest() {
    const obj = refineDeep(
      { foo: { bar: {}, baz: 'hello world' } },
      { ignoreEmptyObjects: true },
    );
    Expect(Object.keys(obj.foo as any)).toEqual(['bar', 'baz']);
  }

  @Test('Cleans zeros')
  public cleansZerosTest() {
    const obj = refineDeep({ foo: { bar: 0, baz: 'hello world' } });
    Expect(Object.keys(obj.foo as any)).toEqual(['baz']);
  }

  @Test('Keeps zeros')
  public keepsZerosTest() {
    const obj = refineDeep(
      { foo: { bar: 0, baz: 'hello world' } },
      { ignoreZeros: true },
    );
    Expect(Object.keys(obj.foo as any)).toEqual(['bar', 'baz']);
  }

  @Test('Cleans NaN')
  public cleansNaNTest() {
    const obj = refineDeep({ foo: { bar: NaN, baz: 'hello world' } });
    Expect(Object.keys(obj.foo as any)).toEqual(['baz']);
  }

  @Test('Keeps NaN')
  public keepsNaNTest() {
    const obj = refineDeep(
      { foo: { bar: NaN, baz: 'hello world' } },
      { ignoreNaN: true },
    );
    Expect(Object.keys(obj.foo as any)).toEqual(['bar', 'baz']);
  }
}
