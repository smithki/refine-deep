# 🧼 `refine-deep`

[![code style: airbnb](https://img.shields.io/badge/code%20style-airbnb-blue.svg?style=flat)](https://github.com/airbnb/javascript)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat)](https://github.com/prettier/prettier)

> Recursively remove falsey values from JavaScript objects.

## 💁🏼‍♂️ Introduction

A simple utility that exposes a `lodash`-style interface for removing falsey values from JavaScript/TypeScript objects.

## 🔗 Installation

Install via `yarn` (recommended):

```sh
yarn add refine-deep
```

Install via `npm`:

```sh
npm install refine-deep
```

## 🛠️ Usage

### Shallow functionality

```ts
import { refine } from 'refine-deep';

refine(['hello world', null, 0, undefined, '', [], {}]);
// => ['hello world']

refine({ helloWorld: '', foo: 'bar', baz: null });
// => { foo: 'bar' }
```

### Recursive functionality

```ts
import { refineDeep } from 'refine-deep';

refineDeep([[null, [999]], { hello: 'world', foo: { bar: 1234, baz: null } }]);
// => [[[999]], { hello: 'world', foo: { bar: 1234 } }]
```

You can optionally specify a maximum recursion depth as the last argument to `refineDeep`:

```ts
refineDeep(myCollection); // Infinity is assumed.
refineDeep(myCollection, depth);
refineDeep(myCollection, options, depth);
```

### Configuration

You can configure `refine` and `refineDeep` with the same options:

> _All options are `false` by default_

```ts
export interface RefineOptions {
  ignoreNil?: boolean; // Retain `null` and `undefined` values.
  ignoreNull?: boolean; // Retain `null` values.
  ignoreUndefined?: boolean; // Retain `undefined` values.
  ignoreEmptyAny?: boolean; // Retain empty arrays, objects, and strings.
  ignoreEmptyArrays?: boolean; // Retain empty arrays.
  ignoreEmptyObjects?: boolean; // Retain empty objects.
  ignoreEmptyStrings?: boolean; // Retain empty strings.
  ignoreZeros?: boolean; // Retain zeros.
  ignoreNaN?: boolean; // Retain NaN.
}

refine(myCollection, { ignore*: true });
refineDeep(myCollection, { ignore*: true }, depth?: number);
```

### UMD interface

If using `refine-deep` as a UMD module (for instance, via [unpkg](https://unpkg.com/refine-deep@3.0.0)), usage is _slightly_ different:

```ts
refine(...) // Exactly the same, non-recursive.

// For recursive behavior, use the following:
refine.deep(...) // Type signature is equivalent to `refineDeep`.
```
