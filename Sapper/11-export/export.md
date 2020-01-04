# export

许多站点实际上是静态的，也就是说它们实际上不需要Express服务器来支持它们。相反，它们可以作为静态文件托管并用作静态文件，从而允许将它们部署到更多托管环境（例如Netlify或GitHub Pages）。静态站点通常更便宜且具有更好的性能特征。

Sapper允许您使用单个零配置命令导出静态站点sapper export。实际上，您正在看的是出口网站！

静态并不意味着非交互式-您的Svelte组件可以像正常一样正常工作，并且您仍然可以获得客户端路由和预取的所有好处。

## sapper 导出

在您的Sapper项目中，尝试以下操作：

```sh
# npx allows you to use locally-installed dependencies
npx sapper export
```

这将创建一个__sapper__/export包含可用于网站的正式生产版本的文件夹。您可以这样启动它:

```sh
npx serve __sapper__/export
```

导航到`localhost:5000`（或选择的任何端口serve），并验证您的站点是否按预期工作。

您还可以将脚本添加到package.json ...

```js
{
  "script": {
    // ...
    "export": "swapper export"
  }
}
```

...允许您使用npm run export您的应用。

## 怎么运行的

在运行时sapper export，Sapper会首先构建应用程序的生产版本（就像您已经运行过一样）sapper build，然后将static文件夹的内容复制到目标位置。然后，它启动服务器，并导航到应用程序的根目录。从那里开始，它跟随`<a>`找到的所有元素，并捕获该应用程序提供的所有数据。

因此，您要包含在导出站点中的任何页面都必须可以通过`<a>`元素访问。此外，任何非页面路线应要求在preload，不是在onMount或其他地方

## 什么时候不出口

基本规则是：要使应用程序可导出，点击应用程序同一页面的任何两个用户必须从服务器获得相同的内容。换句话说，任何涉及用户会话或身份验证的应用都不适合sapper export。

请注意，您仍然可以使用动态路由导出应用程序，就像src/routes/blog/[slug].svelte前面的示例一样。sapper export将拦截fetch在内部发出的请求preload，因此src/routes/blog/[slug].json.js还将捕获从中提供的数据。

## 路线冲突

因为sapper export写入文件系统，所以不可能有两个服务器路由导致目录和文件具有相同的名称。例如，src/routes/foo/index.js并且src/routes/foo/bar.js将尝试创建export/foo和export/foo/bar，这是不可能的。

解决方案是重命名其中一条路由以避免冲突，例如src/routes/foo-bar.js。（请注意，您还需要更新所有从中获取数据的代码/foo/bar以供参考/foo-bar。）

对于页面，我们通过编写export/foo/index.html而不是来解决此问题export/foo.
