# preload

如部分所示，页面组件可以具有可选 preload 功能，该功能将加载页面依赖的某些数据。这与 getInitialPropsNext.js 或 asyncDataNuxt.js 中的相似。

```js
<script context="module">
  export async function preload(page, session) {
    const { slug } = page.params;

    const res = await this.fetch(`blog/${slug}.json`);
    const article = await res.json();

    return { article };
  }
</script>
```

它存在于`context="module"`脚本中（请参阅，因为它不属于组件实例本身。相反，它在创建组件之前运行，从而使您避免在提取数据时发生闪烁。

## Argument

该 preload 函数接收两个参数- page 和 session。

page 是一个{ host, path, params, query }对象，host 是 URL 的主机，path 是它的路径名，params 是从 URL 派生的 path 和路由文件名，并且 query 是查询字符串中值的对象。

因此，如果上面的示例是 src/routes/blog/[slug].svelteURL /blog/some-post?foo=bar&baz，URL 是，则将是正确的：

- page.path === '/blog/some-post'
- page.params.slug === 'some-post'
- page.query.foo === 'bar'
- page.query.baz === true

session 是 session 通过传递给服务器的选项在服务器上生成的 sapper.middleware（TODO，这需要进一步的文档。也许是服务器 API 部分？）

## Return value 返回值

如果您从返回了 Promise preload，则页面将延迟渲染，直到 Promise 分解。您还可以返回一个普通对象。

当 Sapper 在服务器上呈现页面时，它将尝试序列化解析的值（使用）并将其包含在页面上，这样客户端也不需要 preload 在初始化时调用。如果该值包括功能或自定义类（循环和反复引用都很好，因为是内置插件如序列将失败 Date，Map，Set 和 RegExp）。

## Context 语境

在内部 preload，您可以访问三种方法：

- this.fetch(url, options)
- this.error(statusCode, error)
- this.redirect(statusCode, location)

### this.fetch

在浏览器中，您可以 fetch 用来发出 AJAX 请求，以从服务器路由中获取数据（以及其他）。在服务器上，这有点棘手-您可以发出 HTTP 请求，但必须指定一个来源，并且无权访问 Cookie。这意味着不可能根据用户的会话请求数据，例如需要您登录的数据。

为了解决这个问题，Sapper 提供了 this.fetch，它可以在服务器以及客户端上运行：

```js
<script context="module">
  export async function preload() {
    const res = await this.fetch(`secret-data.json`, {
      credentials: 'include'
    });

    // ...
  }
</script>
```

请注意，您将需要使用会话的中间件如在你 app/server.js 为了保持用户会话或做任何事情，包括身份验证。

### 这个错误

如果用户导航到/blog/some-invalid-slug，我们将要呈现 404 Not Found 页面。我们可以这样做 this.error：

```js
<script context="module">
  export async function preload({ params, query }) {
    const { slug } = params;

    const res = await this.fetch(`blog/${slug}.json`);

    if (res.status === 200) {
      const article = await res.json();
      return { article };
    }

    this.error(404, 'Not found');
  }
</script>
```

这同样适用于您可能遇到的其他错误代码。

## this.redirect

您可以使用以下方法终止渲染并重定向到其他位置 this.redirect：

```js
<script context="module">
  export async function preload(page, session) {
    const { user } = session;

    if (!user) {
      return this.redirect(302, 'login');
    }

    return { user };
  }
</script>
```
