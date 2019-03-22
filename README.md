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

refine(['hello world', null, 0, undefined, '', [], {}]) // => ['hello world']
refine({ helloWorld: '', foo: 'bar', baz: null}) // => { foo: 'bar' }
```

### Recursive functionality

```ts
import { refineDeep } from 'refine-deep';

refineDeep([[null, [999]], { hello: 'world', foo: { bar: 1234, baz: null } }]) // => [[[999]], { hello: 'world', foo: { bar: 1234 } }]
```

### Configuration

You can configure `refine` and `refineDeep` with the same options:

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
}

refine(myCollection, { ignore*: true});
```

> All options are `false` by default.
