# 安全

默认情况下，Sapper不会将安全标头添加到您的应用程序，但是您可以使用中间件（例如 Helmet）自己添加安全标头。

## 内容安全政策（CSP）

Sapper生成内联`<script>`s，如果标头不允许任意脚本执行（unsafe-inline），则内联s可能无法执行。

要解决此问题，Sapper可以注入一个可以使用中间件配置的，以发出适当的CSP标头。这是使用`Express`和`Helmet`的示例：

```js
// server.js
import uuidv4 from 'uuid/v4';
import helmet from 'helmet';

app.use((req, res, next) => {
  res.locals.nonce = uuidv4();
  next();
});
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      scriptSrc: [
        "'self'",
        (req, res) => `'nonce-${res.locals.nonce}'`
      ]
    }
  }
}));
app.use(sapper.middleware());
```

res.locals.nonce以这种方式使用遵循`Helmet 的 CSP docs`设置的约定 。
