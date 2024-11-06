# typescript-code
ts的一些练习总结

# tsconfig
[tsconfig.json](./https://wangdoc.com/typescript/tsconfig.json)

## files

`files` 指定编译的文件列表，其中一个不存在就会报错，且必须逐一列出，不支持通配符。建议使用 `include` 和 `exclude`。

## include

`include` 指定编译的文件列表，既支持逐一列出文件，也支持通配符。

```json
{
  "include": ["src/**/*"]
}
```
如果不指定文件后缀名，默认包括 `.ts`、`.tsx` 和 `.d.ts` 文件。如果打开了 `allowJs`，那么还包括 `.js` 和 `.jsx`。

## exclude

`exclude` 属性是一个数组，必须与include属性一起使用，用来从编译列表中去除指定的文件。它也支持使用与 `include` 属性相同的通配符。

## extends

`tsconfig.json` 可以继承另一个 `tsconfig.json` 文件的配置。如 `monorepo` 项目中可以在跟目录设置一个 `tsconfig.json`, 每一个工程继承它，便于维护

extends 属性指定的路径以 `./` 或 `../` 开头，那么编译器将在本地文件中查找，否则编译器将在 `node_modules` 目录下查找指定的配置文件。

## compilerOptions

### allowJs

`allowJs` 允许 TypeScript 项目加载 JS 脚本。编译时，也会将 JS 文件一起拷贝到输出目录。

### alwaysStrict

`alwaysStrict` 确保脚本以 ECMAScript 严格模式进行解析，因此脚本头部不用写 `"use strict"`。它的值是一个布尔值，默认为true。

### allowSyntheticDefaultImports

`allowSyntheticDefaultImports` 允许 `import` 命令默认加载没有 `default` 输出的模块。只影响类型检查。

比如，打开这个设置，就可以写 `import React from "react"`，而不是 `import * as React from "react"`。

### baseUrl

`baseUrl` 的值为字符串，指定 TypeScript 项目的基准目录。

由于默认是以 `tsconfig.json` 的位置作为基准目录，所以一般情况不需要使用该属性。

```json
{
  "compilerOptions": {
    "baseUrl": "./"
  }
}
```
如上面用了 './' 那么，遇到下面的语句时，就会以 `./` 为起点寻找 `hello/world.ts`

```ts
import { helloWorld } from "hello/world";
```

### checkJs

`checkJS` 设置对 JS 文件同样进行类型检查。打开这个属性，也会自动打开 `allowJs`。它等同于在 JS 脚本的头部添加 `// @ts-check` 命令。

### declaration

`declaration` 设置编译时是否为每个脚本生成类型声明文件 `.d.ts`。

```json
{
  "compilerOptions": {
    "declaration": true
  }
}
```

### declarationDir

`declarationDir` 设置生成的 `.d.ts` 文件所在的目录。

```json
{
  "compilerOptions": {
    "declaration": true,
    "declarationDir": "./types"
  }
}
```

### declarationMap

`declarationMap` 设置生成 `.d.ts` 类型声明文件的同时，还会生成对应的 Source Map 文件。

### emitDeclarationOnly

`emitDeclarationOnly` 设置编译后只生成 `.d.ts` 文件，不生成 `.js` 文件。 它与 `noEmit` 不同，`noEmit` 是 `.d.ts` 和 `.js` 都不生成，只做类型检查。

### esModuleInterop !!!

`esModuleInterop` 修复了一些 CommonJS 和 ES6 模块之间的兼容性问题。

如果 `module` 属性的值为 `node16` 或 `nodenext`，则 `esModuleInterop` 默认为 true, 其他情况默认为 false

打开这个属性，作用是让 TypeScript 在处理 CommonJS 模块时，能够更方便地使用 ES 模块的语法，即使 CommonJS 模块没有显示导出 default，TS 也会自动创建一个默认导出。

#### 1. 支持默认导入语法
没有启用时：
```ts
import * as fs from 'fs';
fs.readFileSync('file.txt');
```

启用后可以简化为：

```ts
import fs from 'fs';
fs.readFileSync('file.txt');
```

#### 2.兼容性导入处理
* TypeScript 会自动添加一层包装，将 CommonJS 的 module.exports 转换为 ES 模块的 export default。这种处理方式增加了与旧的 CommonJS 模块的兼容性，避免出现类型错误。
* 这种行为通过生成额外的辅助函数 __importDefault 来实现，确保导入的对象具有 .default 属性。

注意，打开 esModuleInterop，将自动打开 allowSyntheticDefaultImports。

### isolatedModules

`isolatedModules` 设置如果当前 TypeScript 脚本作为单个模块编译，是否会因为缺少其他脚本的类型信息而报错，主要便于非官方的编译工具（比如 Babel）正确编译单个脚本。

### forceConsistentCasingInFileNames

`forceConsistentCasingInFileNames` 设置文件名是否为大小写敏感，默认为 true。

### inlineSourceMap

`inlineSourceMap` 设置将 SourceMap 文件写入编译后的 JS 文件中，否则会单独生成一个 `.js.map` 文件。

### jsx

`jsx` 设置如何处理 `.tsx` 文件，可以取以下值

* preserve: 保留 JSX，不转换。用于与其他工具链（如 Babel）配合使用。
* react: 将 `<div />` 转换为 `React.createElement("div")` 调用，适用于 React 16 及更早版本。
* react-jsx: 将 `<div />` 编译为 `_jsx("div")`， 适用于 React 17+ 的新 JSX 转换 API。
* react-native: 保持 jsx 语法不变，输出的文件后缀名为.js
* react-jsxdev: 与 react-jsx 类似，但生成更详细的调试信息。

```json
{
  "compilerOptions": {
    "jsx": "react-jsx"
  }
}
```

### lib

`lib` 值是一个数组，描述项目需要加载的 TypeScript 内置类型描述文件，跟三斜线指令/// <reference lib="" />作用相同。

```json
{
  "compilerOptions": {
    "lib": ["dom", "es2021"]
  }
}
```

主要的值有一下这些

- ES5
- ES2015
- ES6
- ES2016
- ES7
- ES2017
- ES2018
- ES2019
- ES2020
- ES2021
- ES2022
- ESNext
- DOM
- WebWorker
- ScriptHos

### listEmittedFiles

设置编译时在终端显示生成了哪些文件

```json
{
  "compilerOptions": {
    "listEmittedFiles": true
  }
}
```

### listFiles

设置编译时在终端显示，参与本次编译的文件列表。

```json
{
  "compilerOptions": {
    "listFiles": true
  }
}
```

### module !!!

`module` 指定编译产物的模块格式。它的默认值与 `target` 属性有关，如果 `target` 是 `ES3` 或 `ES5`，它的默认值是 `commonjs`，否则就是 `ES6/ES2015`。

```json
{
  "compilerOptions": {
    "target": "ESNext",
    "module": "ESNext",
  }
}
```

### moduleResolution !!!

moduleResolution 选项用于指定模块解析策略，即 TypeScript 在寻找模块（如 import 的路径）时采用的规则。这个选项会影响 TypeScript 编译器如何查找并解析模块的位置，尤其是当模块路径是相对或非相对时。

moduleResolution 有两个主要的可选值：`classic` 和 `node`。

**1. node 模式（默认）**

node 模式模仿 Node.js 的模块解析逻辑，非常适合在 Node.js 环境中使用。

- 非相对路径：当导入非相对模块时（例如 `import fs from 'fs'`;），TypeScript 会：
  1. 首先在 node_modules 目录中查找模块。
  2. 按照从当前目录到根目录逐级查找 node_modules，直到找到模块或到达根目录。

- 相对路径：当导入相对路径模块（例如 import util from './util';）时，TypeScript 会按文件系统中的相对路径解析模块。

- package.json 中的 main 字段：TypeScript 会检查 package.json 文件的 main 字段，找到模块入口文件。

- @types 类型声明：Node 模式支持查找 @types 包中的类型声明，例如 @types/node，用于为没有自带类型的第三方库提供类型支持。

**2. classic 模式**

classic 模式是 TypeScript 早期的模块解析策略，主要用于浏览器环境。现在已较少使用，通常只在特殊情况下才会启用。

- 非相对路径：TypeScript 会在与当前文件相同的目录中查找模块文件，不会查找 node_modules 目录。

- 相对路径：相对路径的解析与 node 模式类似，但 classic 模式不会考虑 package.json 的 main 字段。

通常指定为 `node`


### noEmit

`noEmit` 设置是否产生编译结果。如果不生成，TypeScript 编译就纯粹作为类型检查了。

### noEmitOnError

`noEmitOnError` 指定一旦编译报错，就不生成编译产物，默认为false。因为 TS 不想类型问题导致产物收到影响，它只是提醒你类型存在问题，至于是否要修复由用户决定

### noEmitHelpers

`noEmitHelpers` 设置在编译结果文件不插入 TypeScript 辅助函数，而是通过外部引入辅助函数来解决，比如 NPM 模块 `tslib`。 默认 false。但通常希望减少代码体积，避免每个文件都生成重复的辅助函数，可以使用 `noEmitHelpers: true` 并配合 `importHelpers：true` 和 `tslib` 库使用。

```json
{
  "compilerOptions": {
    "noEmitHelpers": true,
    "importHelpers": true
  }
}
```

### noImplicitAny

`noImplicitAny` 不要隐式 any。设置当一个表达式没有明确的类型描述、且编译器无法推断出具体类型时，是否允许将它推断为any类型。

它是一个布尔值，默认为 true，即只要推断出 any 类型就报错。 如：

```ts
const x // 这样会报错，变量“x”隐式具有“any”类型
```

### noImplicitReturns

`noImplicitReturns` 设置是否要求函数任何情况下都必须返回一个值，即函数必须有 return 语句。默认 false。


### outDir

`outDir` 指定编译产物的存放目录。如果不指定，编译出来的 `.js` 文件存放在对应的 `.ts` 文件的相同位置。

### paths

`paths` 设置模块名和模块路径的映射，也就是 TypeScript 如何导入 require 或 import 语句加载的模块。

`paths` 基于 `baseUrl` 进行加载，所以必须同时设置 `baseUrl`

```json
{
  "compilerOptions": {
    "baseUrl": "./",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

上面示例中，执行 `import Utils from '@/utils'` 加载的是 `./src/utils`


### noUnusedLocals

是否检查有未使用的本地变量，默认 false, 通常启用为 true


### noUnusedParameters

检查是否有未使用的函数参数，默认 false, 通常设置为 true

### preserveConstEnums

用于控制是否在编译过程中保留 `const enum` 的声明。默认为 false，即删除声明。
看一个例子

```ts
const enum Colors {
  Red = 1,
  Green = 2,
  Blue = 4
}

const myColor = Colors.Green;
```

1. 设置为 false 的编译结果可能如下

  ```js
    const myColor = 2;  // `Colors.Green` 被内联为其值 2
  ```
2. 设置为 true 的结果
  ```js
    var Colors;
    (function (Colors) {
      Colors[Colors["Red"] = 1] = "Red";
      Colors[Colors["Green"] = 2] = "Green";
      Colors[Colors["Blue"] = 4] = "Blue";
    })(Colors || (Colors = {}));

    const myColor = Colors.Green;
  ```
  可以看到完整的枚举对象被保留了。

使用场景

- 优化文件体积： 设置为 false
- 调试和兼容性:  设置为 true

通常，保留或删除 `const enum` 取决于是否需要在编译后代码中看到完整的枚举对象。


### removeComments

`removeComments` 移除 TypeScript 脚本里面的注释，默认为 false。


### resolveJsonModule

resolveJsonModule允许 import 命令导入 JSON 文件。

### skipLibCheck

主要用于跳过 `.d.ts` 的类型检查, 常设为 true

好处
- 在大型项目中，跳过 .d.ts 文件的类型检查可以显著减少编译时间，尤其是当项目依赖许多第三方库时
- 有时第三方库的 .d.ts 类型声明文件可能包含一些不影响项目运行的类型错误。启用 skipLibCheck 可以避免这些错误阻碍项目的编译

### rootDir

rootDir 定义了 TypeScript 编译器在项目中查找源文件的起始路径，也就是编译时的 "逻辑根目录", 这个选项主要**影响输出目录结构的保持**。例如，如果配置了 outDir 来指定编译后的文件输出目录，TypeScript 会在 outDir 中保持相对于 rootDir 的文件结构。

```json
project/
├── src/
│   ├── utils/
│   │   └── helper.ts
│   └── main.ts
├── dist/
└── tsconfig.json
```

如果 tsconfig.json 配置如下

```json
{
  "compilerOptions": {
    "rootDir": "./src",
    "outDir": "./dist"
  }
}
```
那么编译的结果则为

```json
project/
└── dist/
    ├── utils/
    │   └── helper.js
    └── main.js
```

如果没有指定 rootDir，TypeScript 会自动选择包含所有 TypeScript 源文件的最浅目录 (距离跟目录最近的公共父目录) 作为 rootDir。

### sourceMap

设置编译时是否生成 SourceMap 文件。

### strict

用来打开 TypeScript 的严格检查。它的值是一个布尔值，默认是关闭的。通常我们会设置为 true

这个设置相当于同时打开以下一些列设置

- alwaysStrict
- strictNullChecks
- strictBindCallApply
- strictFunctionTypes
- strictPropertyInitialization
- noImplicitAny
- noImplicitThis
- useUnknownInCatchVariables

打开strict的时候，允许单独关闭其中一项。

```json
{
  "compilerOptions": {
    "strict": true,
    "alwaysStrict": false
  }
}
```

### strictNullChecks

不打开 `strictNullChecks` 的情况下，一个变量不管类型是什么，都可以赋值为 undefined 或 null。如

```ts
// 不打开 strictNullChecks 的情况
let x:number;

x = undefined; // 不报错
x = null; // 不报错
```

再看一个例子

```ts
// 打开 strickNullChecks 时，类型 A 为 number
// 不打开时，类型 A 为 string
type A = unknown extends {} ? string : number;
```

`{}` 代表了 `Object` 类型，不打开 `strickNullChecks` 时，它包括了 undefined 和 null，所以可以接受任意类型，也就包括 unknown

这里需要说一下 `{}` 这个类型，它是 `object` 类型的简写，拥有宽松定义，即： 只要值不是 null 或者 undefined，对其他类型不做限制

```ts
let d = {} // d 的类型会被推断为 {}

d = {};
d = { x: 1 };
d = 'hello';
d = 2;

// 以上都 ok

let c: object // d 的类型会被推断为 {}

c = {};
c = { x: 1 };
c = 'hello'; // error Type 'string' is not assignable to type 'object'.
c = 2; // error Type 'string' is not assignable to type 'object'.
```

- {}：允许任何非 null 和非 undefined 的值，包括原始类型。
- object: 只允许非原始类型的值，例如 {}, []，以及其他对象类型的实例。

### strictPropertyInitialization

用于确保在 TypeScript 类中声明的所有属性在构造函数结束前都被正确初始化。默认为 true，可以使用下面的方式避开

```ts
class Person {
  name: string;

  constructor() {
    this.name = "Default Name";
  }
}

// 或者

class Person2 {
  name!: string;
}
```

### target

target 指定编译出来的 JavaScript 代码的 ECMAScript 版本，比如 es2021，默认是 es3。

它可以取以下值。

- es3
- es5
- es6/es2015
- es2016
- es2017
- es2018
- es2019
- es2020
- es2021
- es2022
- esnext

注意，如果编译的目标版本过老，比如 `"target": "es3"`，有些语法可能无法编译，tsc命令会报错

### typeRoots

设置类型模块所在的目录，默认是 `node_modules/@types`，该目录中的模块会自动加入编译，一但指定了该属性，就不会再使用默认值。

该属性的值是一个数组，数组的每一个成员都是一个目录，他们的路径是相对于 `tsconfig.json` 的位置

```json
{
  "compilerOptions": {
    "typeRoots": ["./typings", "./vendor/types"]
  }
}
```

### types

如果指定了 types 属性，那么只有列出的模块会自动加入编译，其他 `node_modules/@types` 中的模块会忽略。

主要用于全局范围内生效的类型包

### useDefineForClassFields

控制编译后的类的属性如何定义

假设有以下类

```ts
class MyClass {
  field = 42;
}
```

如果为 true，编译后

```ts
class MyClass {
  constructor() {
    Object.defineProperty(this, "field", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: 42
    });
  }
}
```

如果为 false, 编译后

```ts
class MyClass {
  constructor() {
    this.field = 42;
  }
}
```

它的默认值跟 target 属性有关，如果编译目标是 ES2022 或更高，那么 `useDefineForClassFields` 默认值为 true，否则为 false。

通常设置为 true, 以与最新 Javascript 规范保持一致。

### useUnknownInCatchVariables

`useUnknownInCatchVariables` 设置 catch 语句捕获的 try 抛出的返回值类型，从 any 变成 unknown。默认为 true

```ts
try {

} catch (err) {} // err: unknown
```

如果设置为 false

```ts
try {

} catch (err) {} // err: any
```

