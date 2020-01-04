# html

```html
{@html expression}
```

在文本表达式中，诸如<和的字符>被转义；但是，对于HTML表达式，不是。

表达式应该是有效的独立的HTML - {@html "<div>"}content{@html "</div>"}将不工作，因为</div>是无效的HTML。

```js
<div class="blog-post">
	<h1>{post.title}</h1>
	{@html post.content}
</div>
```

> Svelte不会在注入HTML之前清理表达式。如果数据来自不受信任的来源，则必须对其进行清理，否则会将用户暴露于XSS漏洞。

