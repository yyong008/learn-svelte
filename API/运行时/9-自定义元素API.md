# 自定义元素API

Svelte组件也可以使用customElement: true编译器选项编译为自定义元素（即Web组件）。您应该使用 `<svelte:options>` 元素为组件指定标签名称。

```xml
<svelte:options tag="my-element">

<script>
	export let name = 'world';
</script>

<h1>Hello {name}!</h1>
<slot></slot>
```

或者，用于tag={null}指示自定义元素的使用者应为其命名。

```js
import MyElement from './MyElement.svelte';

customElements.define('my-element', MyElement);
```

定义自定义元素后，就可以将其用作常规DOM元素：

```html
document.body.innerHTML = `
	<my-element>
		<p>This is some slotted content</p>
	</my-element>
`;
```

默认情况下，自定义元素使用进行编译`accessors: true`，这意味着任何都将作为DOM元素的属性公开（并在可能的情况下作为属性可读/可写）。

为防止这种情况，请添加accessors={false}到`<svelte:options>`。

```js
const el = document.querySelector('my-element');

// get the current value of the 'name' prop
console.log(el.name);

// set a new value, updating the shadow DOM
el.name = 'everybody';
```

自定义元素是将组件打包以在非Svelte应用程序中使用的有用方法，因为自定义元素将与原始HTML和JavaScript以及大多数框架一起使用。但是，需要注意一些重要的区别：

样式是封装的，而不仅仅是范围内的。这意味着任何非组件样式（例如您可能在global.css文件中拥有的样式）都将不适用于自定义元素，包括带有:global(...)修饰符的样式
样式不是作为单独的.css文件提取出来的，而是作为JavaScript字符串内联到组件中的
自定义元素通常不适合服务器端呈现，因为在加载JavaScript之前，阴影DOM是不可见的
在斯维尔特（Svelte）中，广告位内容懒惰地渲染。在DOM中，它渴望呈现。换句话说，即使组件的<slot>元素在{#if ...}块内，也将始终创建它。类似地，<slot>在{#each ...}块中包含不会导致分段显示的内容被多次渲染
该let:指令无效
需要使用Polyfill来支持较旧的浏览器