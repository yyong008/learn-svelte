# 路由

如我们所见，Sapper中有两种路由类型：页面路由和服务器路由。

## 页面路由

页面是写在.svelte文件中的Svelte组件。当用户首次访问该应用程序时，将为他们提供所讨论路由的服务器呈现版本，以及一些JavaScript，这些JavaScript“填充”页面并初始化客户端路由器。从那时起，导航到其他页面完全在客户端上进行，以提供类似于应用程序的快速感觉。

文件名确定路线。例如，src/routes/index.svelte是您网站的根目录：

```html
<!-- src/routes/index.svelte -->
<svelte:head>
	<title>Welcome</title>
</svelte:head>

<h1>Hello and welcome to my site!</h1>
```

称为src/routes/about.svelte或的文件src/routes/about/index.svelte对应于该/about路线：

```html
<!-- src/routes/about.svelte -->
<svelte:head>
	<title>About</title>
</svelte:head>

<h1>About this site</h1>
<p>TODO...</p>
```

动态参数使用编码[brackets]。例如，以下是您如何创建呈现博客文章的页面的方法：

```html
<!-- src/routes/blog/[slug].svelte -->
<script context="module">
	// the (optional) preload function takes a
	// `{ path, params, query }` object and turns it into
	// the data we need to render the page
	export async function preload(page, session) {
		// the `slug` parameter is available because this file
		// is called [slug].svelte
		const { slug } = page.params;

		// `this.fetch` is a wrapper around `fetch` that allows
		// you to make credentialled requests on both
		// server and client
		const res = await this.fetch(`blog/${slug}.json`);
		const article = await res.json();

		return { article };
	}
</script>

<script>
	export let article;
</script>

<svelte:head>
	<title>{article.title}</title>
</svelte:head>

<h1>{article.title}</h1>

<div class='content'>
	{@html article.html}
</div>
```

> 有关和的更多信息，请参见预加载部分： preloadthis.fetch

## 服务器路由

服务器路由是写在.js文件中的模块，这些文件导出与HTTP方法相对应的功能。每个函数都将HTTP request和response对象作为参数，再加上一个next函数。这对于创建JSON API很有用。例如，以下是您可以创建为上面的博客页面提供服务的终结点的方法：

```js
// routes/blog/[slug].json.js
import db from './_database.js'; // the underscore tells Sapper this isn't a route

export async function get(req, res, next) {
	// the `slug` parameter is available because this file
	// is called [slug].json.js
	const { slug } = req.params;

	const article = await db.get(slug);

	if (article !== null) {
		res.setHeader('Content-Type', 'application/json');
		res.end(JSON.stringify(article));
	} else {
		next();
	}
}
```

> delete是JavaScript中的保留字。要处理DELETE请求，请导出一个名为的函数del。

## 文件命名规则

命名用于定义路由的文件有以下三个简单规则：

名为的文件src/routes/about.svelte对应于该/about路线。所谓的文件src/routes/blog/[slug].svelte对应的/blog/:slug路线，在这种情况下，params.slug可用来preload
该文件src/routes/index.svelte对应于您的应用程序的根目录。src/routes/about/index.svelte的处理方式与相同src/routes/about.svelte。
下划线前的文件和目录不会创建路由。这使您可以将帮助程序模块和组件与依赖于它们的路由放在一起-例如，您可以拥有一个名为的文件src/routes/_helpers/datetime.js，而不会创建/_helpers/datetime路由

## 错误页面

除了常规页面之外，Sapper还希望找到一个“特殊”页面- src/routes/_error.svelte。呈现页面时发生错误时，将显示此信息。

该error对象与HTTP status代码一起可用于模板。

路由中的正则表达式
通过将正则表达式的子集放在参数名称后的括号中，可以使用正则表达式的子集来限定路由参数。

例如，src/routes/items/[id([0-9]+)].svelte仅匹配数字ID- /items/123匹配但/items/xyz不匹配。

由于技术上的限制，不能使用下列字符：`/`, `\`, `?`, `:`, `(` and `)`.