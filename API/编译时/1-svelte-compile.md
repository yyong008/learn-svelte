# 编译时间

通常，您不会直接与 Svelte 编译器进行交互，而是使用捆绑程序插件将其集成到构建系统中：

适用于 Rollup 用户的 rollup-plugin-svelte
适用于 Webpack 用户的 svelte-loader
或社区维护的插件

尽管如此，了解打包器的用法还是很有用的，因为捆绑程序插件通常向您提供编译器选项

## svelte.compile

```js
result: {
	js,
	css,
	ast,
	warnings,
	vars,
	stats
} = svelte.compile(source: string, options?: {...})
```

这就是魔术发生的地方。svelte.compile 获取组件的源代码，并将其转换为导出类的 JavaScript 模块.

```js
const svelte = require('svelte/compiler')

const result = svelte.compile(source, {
  // options
})
```

可以将以下选项传递给编译器。不需要：

|        选项        |    默认     |                                                                                                   描述                                                                                                   |
| :----------------: | :---------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|      filename      |    null     |                                                                      string 用于调试提示和源映射。您的捆绑软件插件会自动进行设置。                                                                       |
|        name        | "Component" |                                string 设置结果 JavaScript 类的名称（尽管如果编译器会与范围内的其他变量发生冲突，则编译器会对其进行重命名）。通常可以从推断出来 filename。                                |
|       format       |    "esm"    |            如果为"esm"，则创建一个 JavaScript 模块（带有 import 和 export）。如果为"cjs"，则创建一个 CommonJS 模块（带有 require 和 module.exports），在某些服务器端渲染情况或测试中很有用。             |
|      generate      |    "dom"    | 如果为"dom"，则 Svelte 会发出一个 JavaScript 类以将其安装到 DOM。如果为"ssr"，则 Svelte 使用 render 适合服务器端渲染的方法发射对象。如果为 false，则不返回 JavaScript 或 CSS；否则为 false。只是元数据。 |
|        dev         |    false    |                                                     如果为 true，则导致将额外的代码添加到组件，这些代码将执行运行时检查并在开发过程中提供调试信息。                                                      |
|     immutable      |    false    |                                                         如果为 true，则告诉编译器您保证不会突变任何对象。这使它在检查值是否已更改时不那么保守。                                                          |
|     hydratable     |    false    |                                                   如果为 true，则启用 hydrate: true 运行时选项，该选项允许组件升级现有 DOM，而不是从头开始创建新 DOM。                                                   |
|       legacy       |    false    |                                                             如果 true，则生成可在 IE9 和 IE10 中使用的代码，这些代码不支持 element.dataset。                                                             |
|     accessors      |    false    |    如果为 true，则将为组件的 props 创建 getter 和 setter。如果 false，他们将只用于只读出口值创建（即那些声明 const，class 和 function）。如果使用 customElement: true 此选项进行编译，则默认为 true。    |
|   customElement    |    false    |                                                               如果为 true，则告诉编译器生成自定义元素构造函数，而不是常规的 Svelte 组件。                                                                |
|        tag         |    null     |                                         一 string，告诉斯维尔特什么标签名称来注册自定义元素。它必须是带有至少一个连字符的小写字母数字字符串，例如"my-element"。                                          |
|        css         |    true     |                         如果为 true，则样式将包含在 JavaScript 类中并在运行时注入。建议您将此设置为，false 并使用静态生成的 CSS，因为这将导致较小的 JavaScript 包和更好的性能。                          |
|  loopGuardTimeout  |      0      |                                    一 number，告诉斯维尔特打破循环，如果它阻塞线程超过 loopGuardTimeout 毫秒。这对于防止无限循环很有用。仅在以下情况下可用 dev: true                                     |
|  preserveComments  |    false    |                                                               如果为 true，则 HTML 注释将在服务器端渲染期间保留。默认情况下，它们被删除。                                                                |
| preserveWhitespace |    false    |                                                               如果为 true，则键入时将保留元素内部和元素之间的空格，而不是由 Svelte 优化。                                                                |
|   outputFilename   |    null     |                                                                               一个 string 用于你的 JavaScript sourcemap。                                                                                |
| cssOutputFilename  |    null     |                                                                                   一个 string 用于你的 CSS sourcemap。                                                                                   |
|     sveltePath     |  "svelte"   |                                                                   svelte 包裹的位置。从 svelte 或 svelte/[module]将进行任何修改的进口                                                                    | 。 |

返回的result对象包含您组件的代码以及有用的元数据位。

```js
const {
	js,
	css,
	ast,
	warnings,
	vars,
	stats
} = svelte.compile(source);
```

- js并且css是具有以下属性的对象：
  - code 是一个JavaScript字符串
  - map是与另外的一个sourcemap toString()和toUrl()方便的方法
- ast 是代表组件结构的抽象语法树。
- warnings是在编译过程中生成的一系列警告对象。每个警告都有几个属性：
  - code 是标识警告类别的字符串
  - message 用易于理解的术语描述问题
  - start并且end，如果警告涉及到特定的位置，与对象line，column和character属性
  - frame（如果适用）是一个用行号突出显示有问题代码的字符串
- vars是组件声明的数组，例如由使用。每个变量都有几个属性：
  - name 是不言自明的
  - export_name是将值导出为的名称（如果已导出）（name除非匹配，否则将匹配export...as）
  - injected是true声明是否由Svelte注入，而不是在您编写的代码中注入
  - module是true如果值是在context="module"脚本中声明的
  - mutated是true是否将值的属性分配给组件内部
  - reassigned是true如果在组件内部重新分配了值
  - referenced是true如果值在声明之外使用
  - writable是true如果该值被宣布有let或var（而不是const，class或function）
- stats是Svelte开发人员团队用于诊断编译器的对象。避免依靠它保持不变！
  