# 部署方式

Sapper应用程序可在支持Node 8或更高版本的任何位置运行。

## 部署到 Now 1

> 本部分与Now 1（而非Now 2）相关

我们可以轻松地将应用程序部署到 Now：

```js
npm install -g now
now
```

这会将源代码上传到Now，随后它将执行操作npm run build，npm start并为您提供已部署应用程序的URL。

对于其他托管环境，您可能需要npm run build自己做。

## 部署服务人员

Sapper service-worker.js通过在源代码中包含时间戳记（使用来计算）来使Service Worker文件（）唯一Date.now()。

在将应用程序部署到多个服务器的环境中（例如Now），建议对所有部署使用一致的时间戳。否则，用户可能会遇到服务工作者意外更新的问题，因为该应用程序先击中服务器1，然后又击中服务器2，并且时间戳略有不同。

要覆盖Sapper的时间戳，您可以使用环境变量（例如SAPPER_TIMESTAMP），然后修改service-worker.js：

```js
const timestamp = process.env.SAPPER_TIMESTAMP; // instead of `import { timestamp }`

const ASSETS = `cache${timestamp}`;

export default {
  /* ... */
  plugins: [
    /* ... */
    replace({
      /* ... */
      'process.env.SAPPER_TIMESTAMP': process.env.SAPPER_TIMESTAMP || Date.now()
    })
  ]
}
```

然后，您可以使用环境变量进行设置，例如：

```sh
SAPPER_TIMESTAMP=$(date +%s%3N) npm run build
```

部署到Now时，可以将环境变量传递给Now本身：

```sh
now -e SAPPER_TIMESTAMP=$(date +%s%3N);
```
