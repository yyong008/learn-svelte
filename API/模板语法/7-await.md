# await

```html
{#await expression}...{:then name}...{:catch name}...{/await}
{#await expression}...{:then name}...{/await}
{#await expression then name}...{/await}
```

通过“等待”块，您可以在Promise的三个可能状态上分支-未决，已实现或已拒绝。

```html
{#await promise}
	<!-- promise is pending -->
	<p>waiting for the promise to resolve...</p>
{:then value}
	<!-- promise was fulfilled -->
	<p>The value is {value}</p>
{:catch error}
	<!-- promise was rejected -->
	<p>Something went wrong: {error.message}</p>
{/await}
```

catch如果您在诺言被拒绝时不需要渲染任何东西（或者没有错误可能），则可以忽略该块。

```html
{#await promise}
	<!-- promise is pending -->
	<p>waiting for the promise to resolve...</p>
{:then value}
	<!-- promise was fulfilled -->
	<p>The value is {value}</p>
{/await}
```

如果您不关心挂起状态，也可以省略初始块。

```html
{#await promise then value}
	<p>The value is {value}</p>
{/await}
```