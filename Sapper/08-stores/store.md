# store

在page和session传递到值preload函数可用于组件，随着preloading。

在组件内部，获取对商店的引用，如下所示：

```html
<script>
  import { stores } from '@sapper/app';
  const { preloading, page, session } = stores();
</script>
```

- preloading 包含一个只读布尔值，指示导航是否挂起
- page包含一个只读{ host, path, params, query }对象，与传递给preload函数的对象相同
- session包含任何已植入服务器的数据。这是一个，这意味着您可以使用新数据更新它（例如，在用户登录后），并且您的应用程序将刷新。

## 下发session数据

在服务器上，您可以session通过将一个选项传递给来进行填充sapper.middleware：

```js
// src/server.js
express() // or Polka, or a similar framework
  .use(
    serve('static'),
    authenticationMiddleware(),
    sapper.middleware({
      session: (req, res) => ({
        user: req.user
      })
    })
  )
  .listen(process.env.PORT);
```

> 会话数据必须可序列化（使用devalue）-没有函数或自定义类，仅内置JavaScript数据类型。

## Prefecting 预取

Sapper使用代码拆分将您的应用程序分成小块（每个路由一个），以确保快速启动。

对于动态路由（例如我们的`src/routes/blog/[slug].svelte`示例），这还不够。为了呈现该博客文章，我们需要为其获取数据，并且只有知道了什么之后我们才能这样做slug。在最坏的情况下，这可能会导致滞后，因为浏览器等待数据从服务器返回。

### rel=prefetch

我们可以通过预取数据来缓解这种情况。向rel=prefetch链接添加属性...

```html
<a rel=prefetch href='blog/what-is-sapper'>What is Sapper?</a>
```

将导致Sapper preload在用户将鼠标悬停在链接上（在桌面上）或触摸链接（在移动设备上）后立即运行页面的功能，而不是等待click事件触发导航。通常，这会给我们多花几百毫秒，这就是感觉不方便的用户界面和感觉敏捷的用户界面之间的区别。

> rel=prefetch是Sapper习语，不是`<a>`元素的标准属性
