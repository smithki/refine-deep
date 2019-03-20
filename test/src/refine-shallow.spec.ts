// --- Imports -------------------------------------------------------------- //

import { Expect, Test, TestFixture } from 'alsatian';
import { refine } from '../../src/lib';

// -------------------------------------------------------------------------- //

@TestFixture('Shallow Tests')
export class ShallowTestFixture {
  @Test('Cleans `undefined`')
  public cleansUndefinedTest() {
    const obj = refine({ foo: 'hello world', bar: undefined });
    const arr = refine(['hello world', undefined]);

    Expect(Object.keys(obj)).toEqual(['foo']);
    Expect(arr.length).toEqual(1);
    Expect(arr[0]).toEqual('hello world');
  }

  @Test('Cleans `null`')
  public cleansNullTest() {
    const obj = refine({ foo: 'hello world', bar: null });
    const arr = refine(['hello world', null]);

    Expect(Object.keys(obj)).toEqual(['foo']);
    Expect(arr.length).toEqual(1);
    Expect(arr[0]).toEqual('hello world');
  }

  @Test('Cleans `undefined` but not `null`')
  public cleansUndefinedButNotNullTest() {
    const obj = refine({ foo: null, bar: undefined }, { ignoreNull: true });
    const arr = refine([undefined, null], { ignoreNull: true });

    Expect(Object.keys(obj)).toEqual(['foo']);
    Expect(arr.length).toEqual(1);
    Expect(arr[0]).toBeNull();
  }

  @Test('Cleans `null` but not `undefined`')
  public cleansNullButNotUndefinedTest() {
    const obj = refine(
      { foo: null, bar: undefined },
      { ignoreUndefined: true },
    );
    const arr = refine([undefined, null], { ignoreUndefined: true });

    Expect(Object.keys(obj)).toEqual(['bar']);
    Expect(arr.length).toEqual(1);
    Expect(typeof arr[0]).toEqual('undefined');
  }

  @Test('Keeps `nil` values')
  public keepsNilValues() {
    const obj = refine({ foo: undefined, bar: null }, { ignoreNil: true });
    Expect(Object.keys(obj)).toEqual(['foo', 'bar']);
  }

  @Test('Keeps empty values')
  public keepsEmptyValues() {
    const arr = refine(['', {}, []], { ignoreEmptyAny: true });
    Expect(arr[0]).toEqual('');
    Expect(arr[1]).toEqual({});
    Expect(arr[2]).toEqual([]);
    Expect(arr.length).toEqual(3);
  }

  @Test('Cleans empty strings')
  public cleansEmptyStringsTest() {
    const obj = refine({ foo: 'hello world', bar: '' });
    Expect(Object.keys(obj)).toEqual(['foo']);
  }

  @Test('Keeps empty strings')
  public keepsEmptyStringsTest() {
    const obj = refine(
      { foo: 'hello world', bar: '' },
      { ignoreEmptyStrings: true },
    );
    Expect(Object.keys(obj)).toEqual(['foo', 'bar']);
  }

  @Test('Cleans empty arrays')
  public cleansEmptyArraysTest() {
    const obj = refine({ foo: 'hello world', bar: [] });
    Expect(Object.keys(obj)).toEqual(['foo']);
  }

  @Test('Keeps empty arrays')
  public keepsEmptyArraysTest() {
    const obj = refine(
      { foo: 'hello world', bar: [] },
      { ignoreEmptyArrays: true },
    );
    Expect(Object.keys(obj)).toEqual(['foo', 'bar']);
  }

  @Test('Cleans empty objects')
  public cleansEmptyObjectsTest() {
    const obj = refine({ foo: 'hello world', bar: {} });
    Expect(Object.keys(obj)).toEqual(['foo']);
  }

  @Test('Keeps empty objects')
  public keepsEmptyObjectsTest() {
    const obj = refine(
      { foo: 'hello world', bar: {} },
      { ignoreEmptyObjects: true },
    );
    Expect(Object.keys(obj)).toEqual(['foo', 'bar']);
  }

  @Test('Cleans zeros')
  public cleansZerosTest() {
    const obj = refine({ foo: 'hello world', bar: 0 });
    Expect(Object.keys(obj)).toEqual(['foo']);
  }

  @Test('Keeps zeros')
  public keepsZerosTest() {
    const obj = refine({ foo: 'hello world', bar: 0 }, { ignoreZeros: true });
    Expect(Object.keys(obj)).toEqual(['foo', 'bar']);
  }
}
