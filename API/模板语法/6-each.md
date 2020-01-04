# each

```
{#each expression as name}...{/each}
{#each expression as name, index}...{/each}
{#each expression as name, index (key)}...{/each}
{#each expression as name}...{:else}...{/each}
```

可以使用每个块对值列表进行遍历

```html
<h1>Shopping list</h1>
<ul>
	{#each items as item}
		<li>{item.name} x {item.qty}</li>
	{/each}
</ul>
```

每个块还可以指定一个索引，该索引等于array.map(...)回调中的第二个参数：

```js
{#each items as item, i}
	<li>{i + 1}: {item.name} x {item.qty}</li>
{/each}
```

如果提供了键表达式（必须唯一地标识每个列表项），则Svelte将在数据更改时使用它来区分列表，而不是最后添加或删除项。键可以是任何对象，但是建议使用字符串和数字，因为它们允许在对象本身更改时保留身份。

```html
{#each items as item, i (item.id)}
	<li>{i + 1}: {item.name} x {item.qty}</li>
{/each}
```

您可以在每个块中自由使用解构和休息模式

```js
{#each items as { id, name, qty }, i (id)}
	<li>{i + 1}: {name} x {qty}</li>
{/each}

{#each objects as { id, ...rest }}
	<li><span>{id}</span><MyComponent {...rest}/></li>
{/each}

{#each items as [id, ...rest]}
	<li><span>{id}</span><MyComponent values={rest}/></li>
{/each}
```

每个块还可以具有一个{:else}子句，如果列表为空，则会显示该子句。

```js
{#each todos as todo}
	<p>{todo.text}</p>
{:else}
	<p>No tasks today!</p>
{/each}
```

