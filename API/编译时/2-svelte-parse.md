# svelte.parse

```js
ast: object = svelte.parse(
	source: string,
	options?: {
		filename?: string,
		customElement?: boolean
	}
)
```

该parse函数解析一个组件，仅返回其抽象语法树。与使用该generate: false选项进行编译不同，这不会对组件进行任何验证或其他分析，而只会对其进行解析。

```js
const svelte = require('svelte/compiler');

const ast = svelte.parse(source, { filename: 'App.svelte' });
```
