# svelte/register

要在Node.js中呈现Svelte组件而不进行捆绑，请使用require('svelte/register')。之后，您可以require用来包含任何.svelte文件。

```js
require('svelte/register');

const App = require('./App.svelte').default;

...

const { html, css, head } = App.render({ answer: 42 });
```

> .default之所以必须这样做，是因为我们正在将本机JavaScript模块转换为Node可以识别的CommonJS模块。请注意，如果您的组件导入了JavaScript模块，则它们将无法在Node中加载，而您将需要使用捆绑器。

要设置编译选项或使用自定义文件扩展名，请将该register钩子作为函数调用：

```js
require('svelte/register')({
  extensions: ['.customextension'], // defaults to ['.html', '.svelte']
	preserveComments: true
});
```
