# 服务器端组件API

```js
const result = Component.render(...)
```

与客户端组件不同，服务器端组件在呈现它们之后没有生命周期，它们的全部工作就是创建一些HTML和CSS。因此，API有所不同。

服务器端组件公开了render可以用可选属性调用的方法。它返回具有head，html和css属性的对象，其中head包含`<svelte:head>`遇到的任何元素的内容。

您可以使用将Svelte组件直接导入Node 。

```js
require('svelte/register');

const App = require('./App.svelte').default;

const { head, html, css } = App.render({
	answer: 42
});
```