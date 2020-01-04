# if

```
{#if expression}...{/if}
{#if expression}...{:else if expression}...{/if}
{#if expression}...{:else}...{/if}
```

有条件渲染的内容可以包装在if块中。

```html
{#if answer === 42}
	<p>what was the question?</p>
{/if}
```

可以使用添加其他条件{:else if expression}，并可选地以{:else}子句结尾。

```html
{#if porridge.temperature > 100}
	<p>too hot!</p>
{:else if 80 > porridge.temperature}
	<p>too cold!</p>
{:else}
	<p>just right!</p>
{/if}
```
