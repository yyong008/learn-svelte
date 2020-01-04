# debug

```js
{@debug}
{@debug var1, var2, ..., varN}
```

该{@debug ...}标签提供一种替代console.log(...)。每当特定变量的值更改时，它都会记录这些变量的值；如果您打开了devtools，它将暂停代码执行。

它接受以逗号分隔的变量名列表（不是任意表达式）。

```html
<script>
	let user = {
		firstname: 'Ada',
		lastname: 'Lovelace'
	};
</script>

{@debug user}

<h1>Hello {user.firstname}!</h1>
```

{@debug ...} 接受以逗号分隔的变量名列表（不是任意表达式）。

```jsx
<!-- Compiles -->
{@debug user}
{@debug user1, user2, user3}

<!-- WON'T compile -->
{@debug user.firstname}
{@debug myArray[0]}
{@debug !isReady}
{@debug typeof user === 'object'}
```

{@debug}没有任何参数的标签将插入一条debugger语句，该语句在任何状态发生变化时都会触发，这与指定的变量相反。