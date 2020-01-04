# client Api

@sapper/app 由 Sapper 根据您的应用程序形状生成的模块，包含用于以编程方式控制 Sapper 和响应事件的功能。

## start({ target })

- target — an element to render pages to

这将配置路由器并启动应用程序-侦听对`<a>`元素的点击，与`history` API 交互，并渲染和更新 Svelte 组件。

返回一个 Promise，当初始页面被混合时解析。

```js
import * as sapper from '@sapper/app'

sapper
  .start({
    target: document.querySelector('#sapper'),
  })
  .then(() => {
    console.log('client-side app has started')
  })
```

## goto(href, options?)

- href —转到的页面
- options—可以包含一个 replaceState 属性，该属性确定是使用 history.pushState（默认值）还是使用 history.replaceState。

以编程方式导航到给定的 href。如果目的地是 Sapper 路线，则 Sapper 将处理导航，否则将使用 new 重新加载页面 href。换句话说，行为就像用户单击带有 this 的链接一样 href。

返回 Promise 在导航完成时解析的。

## prefetch(href)

- href — 要预取的页面

以编程方式预取给定的页面，这意味着 a）确保该页面的代码已加载，并且 b）preload 使用适当的选项调用该页面的方法。这与用户`<a>`使用在元素上点击或鼠标移动时 Sapper 触发的行为相同。

返回一个 Promise 在预取完成时解析的。

## prefetchRoutes(routes?)

- routes —表示预取路由的可选字符串数组。

以编程方式预取尚未获取的路由的代码。通常，您可以在 sapper.start()完成后调用此方法，以加快后续导航的速度（这是的'L' ）。省略参数将导致获取所有路由，或者您可以通过任何匹配的路径名（例如/about（to match src/routes/about.svelte）或/blog/\*（to match src/routes/blog/[slug].svelte））指定路由。不同于 prefetch，这不会需要 preload 单独的页面。

返回一个 Promise，用于解析何时预取路由。
