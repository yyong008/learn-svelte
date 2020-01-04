# svelte

## svelte:self

该`<svelte:self>`元素允许组件递归地包含自身。

它不能出现在标记的顶层；它必须在if或每个块内，以防止无限循环。

```html
<script>
	export let count;
</script>

{#if count > 0}
	<p>counting down... {count}</p>
	<svelte:self count="{count - 1}"/>
{:else}
	<p>lift-off!</p>
{/if}
```

## svelte:component

`<svelte:component>`元件呈现一个动态成分，使用指定为所述部件的构造this特性。当属性更改时，该组件将被销毁并重新创建。

如果this为假，则不呈现任何组件。

```html
<svelte:component this={expression}/>

<svelte:component this={currentSelection.component} foo={bar}/>
```

## svelte:window

```html
<svelte:window on:event={handler}/>
<svelte:window bind:prop={value}/>
```

该`<svelte:window>`元素允许您添加事件侦听器的window对象，而不用担心删除它们时组件被破坏，或者检查是否存在window时，服务器端渲染。

```html
<script>
	function handleKeydown(event) {
		alert(`pressed the ${event.key} key`);
	}
</script>

<svelte:window on:keydown={handleKeydown}/>
```

您还可以绑定到以下属性：

- innerWidth
- innerHeight
- outerWidth
- outerHeight
- scrollX
- scrollY
- online — window.navigator.onLine的别名
  
除scrollX和外的所有内容scrollY都是只读的。

```html
<svelte:window bind:scrollY={y}/>
```

## svelte:body

```html
<svelte:body on:event={handler}/>
```

和`<svelte:window>`此元素一样，您可以将侦听器添加到`document.body`诸如上`mouseenter`和`mouseleave`不触发的事件上`window`。

```html
<svelte:body
	on:mouseenter={handleMouseenter}
	on:mouseleave={handleMouseleave}
/>
```

## svelte:head

```html
<svelte:head>...</svelte:head>
```

该元素可以将元素插入document.head。在服务器端渲染期间，head内容分别暴露于主要html内容。

```html
<svelte:head>
	<link rel="stylesheet" href="tutorial/dark-theme.css">
</svelte:head>
```

## svelte:options

```html
<svelte:options option={value}/>
```

的<svelte:options>元件提供了指定每组件的编译器选择，这在详细的地方。可能的选项是：

- immutable={true} —您从不使用可变数据，因此编译器可以执行简单的引用相等性检查以确定值是否已更改
- immutable={false}—默认值。Svelte对于可变对象是否已更改将更加保守
- accessors={true} -为组件的props添加getter和setter
- accessors={false} —默认
- namespace="..." —将使用此组件的名称空间，最常见的是“ svg”
- tag="..." —将此组件编译为自定义元素时使用的名称。

```html
<svelte:options tag="my-custom-element"/>
```
