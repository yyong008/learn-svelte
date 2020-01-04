# 客户端 API

## 创建一个组件

```js
const component = new Component(options)
```

客户端组件-即使用 generate: 'dom'（或未 generate 指定选项）编译的组件是 JavaScript 类。

```js
import App from './App.svelte'

const app = new App({
  target: document.body,
  props: {
    // assuming App.svelte contains something like
    // `export let answer`:
    answer: 42,
  },
})
```

可以提供以下初始化选项：

|  选项   | 默认  |                             描述                              |
| :-----: | :---: | :-----------------------------------------------------------: |
| target  | 没有  |             一 HTMLElement 来渲染。此选项是必需的             |
| anchor  | null  |               的子项，target 即将在之前渲染组件               |
|  props  |  {}   |                     提供给组件的属性对象                      |
| hydrate | false |                            见下文                             |
|  intro  | false | 如果为 true，则将在初始渲染时播放过渡，而不是等待后续状态更改 |

现有子代target留在原处。

该hydrate选项指示Svelte升级现有DOM（通常从服务器端渲染）而不是创建新元素。仅当使用编译组件时，它才有效。

鉴于target通常情况下，hydrate: true他们的孩子将被带走。因此，该anchor选项不能与一起使用hydrate: true。

现有的DOM不需要与组件匹配-Svelte会在进行DOM时对其进行“修复”。

```js
import App from './App.svelte';

const app = new App({
	target: document.querySelector('#server-rendered-html'),
	hydrate: true
});
```

## $set

```js
component.$set(props)
component.$set({ answer: 42 });
```

以编程方式在实例上设置道具。component.$set({ x: 1 })等效于x = 1组件`<script>`块内部。

调用此方法可调度下一个微任务的更新-DOM 不会同步更新。

## $on

```js
component.$on(event, callback)

const off = app.$on('selected', event => {
	console.log(event.detail.selection);
});

off();
```

导致该callback函数在组件分派时被调用event。

返回一个函数，该函数在调用时将删除事件侦听器。

## destory

```js
component.$destroy()
```

从DOM中删除一个组件并触发所有onDestroy处理程序。

## 组件 props

```text
component.prop
component.prop = value
```

如果使用编译组件 `accessors: true`，则每个实例将具有与该组件的每个道具对应的getter和setter。设置值将导致同步更新，而不是由引起的默认异步更新component.$set(...)。

默认情况下accessors为false，除非您要作为自定义元素进行编译。

```js
console.log(app.count);
app.count += 1;
```
