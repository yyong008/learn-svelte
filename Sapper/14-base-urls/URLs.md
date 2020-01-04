# 基本网址

通常，您的Sapper应用的根目录位于/。但是在某些情况下，您的应用可能需要从其他基本路径提供服务-例如，如果Sapper仅控制您的域的一部分，或者您有多个Sapper应用并排运行。

可以这样完成：

```js
// app/server.js

express() // or Polka, or a similar framework
  .use(
    '/my-base-path', // <!-- add this line
    compression({ threshold: 0 }),
    serve('static'),
    sapper.middleware()
  )
  .listen(process.env.PORT);
```

Sapper将检测基本路径，并相应地配置服务器端和客户端路由器。

如果您要应用，则需要告诉导出器从何处开始爬网：

```sh
sapper export --basepath my-base-path
```