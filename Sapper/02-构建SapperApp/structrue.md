# SAPPER应用程序结构

这部分是好奇的参考。我们建议您先使用项目模板，然后在感觉如何组合在一起时回到这里。

如果您查看[sapper-template](https://github.com/sveltejs/sapper-template)库中的内容，则会看到Sapper希望找到的一些文件：

```bash
├ package.json
├ src
│ ├ routes
│ │ ├ # your routes here
│ │ ├ _error.svelte
│ │ └ index.svelte
│ ├ client.js
│ ├ server.js
│ ├ service-worker.js
│ └ template.html
├ static
│ ├ # your files here
└ rollup.config.js / webpack.config.js
```

首次运行Sapper时，它将创建一个`__sapper__` 包含生成文件的附加目录。

您会注意到一些额外的文件和`cypress`与有关的目录-我们现在不必担心这些。

> 您可以从头开始创建这些文件，但最好使用模板。有关如何轻松克隆它的说明，请参阅。

## package.json

package.json包含应用程序的依赖项，并定义了许多脚本：

- npm run dev —以开发模式启动应用，并查看源文件中的更改
- npm run build —在生产模式下构建应用
npm run export—烘焙静态版本（如果适用）（请参阅）
npm start —构建应用后，以生产模式启动该应用
npm test—运行测试（请参阅）

## src

其中包含应用程序的三个入口点src/client.js，src/server.js和（可选）src/service-worker.js以及src/template.html文件。

### src / client.js

这必须start从生成的@sapper/app模块中导入并调用该函数：

import * as sapper from '@sapper/app';

sapper.start({
	target: document.querySelector('#sapper')
});

## src / server.js

这是一个普通的Express（或 Polka 等）应用，具有三个要求：

它应该static使用例如来提供文件夹的内容
它应该app.use(sapper.middleware())在最后调用，sapper从哪里导入@sapper/server
它必须听 process.env.PORT
除此之外，您还可以根据自己的喜好编写服务器。

### src / service-worker.js

服务人员充当代理服务器，使您可以精确控制如何响应网络请求。例如，当浏览器请求时/goats.jpg，服务工作者可以使用先前缓存的文件进行响应，或者可以将请求传递给服务器，甚至可以使用完全不同的响应（例如骆驼的图片）进行响应。

除其他外，这使得构建脱机工作的应用程序成为可能。

因为每个应用程序都需要一个略有不同的服务人员（有时总是从缓存中进行服务是适当的，有时只有在没有连接的情况下才应采取最后手段），所以Sapper不会尝试控制服务人员。而是在中编写逻辑service-worker.js。您可以从导入以下任何内容@sapper/service-worker：

files—在static目录中找到的文件数组
shell -捆绑程序（Rollup或Webpack）生成的客户端JavaScript
routes— { pattern: RegExp }可用于确定是否正在请求由Sapper控制的页面的对象数组
timestamp —生成服务程序的时间（用于生成唯一的缓存名称）

### src / template.html

该文件是服务器响应的模板。Sapper将注入替换以下标签的内容：

%sapper.base%— <base>元素（请参阅）
%sapper.styles% —所请求页面的关键CSS
%sapper.head%—表示页面特定<head>内容的HTML ，例如<title>
%sapper.html% —表示要呈现的页面正文的HTML
%sapper.scripts% —客户端应用程序的脚本标签.

## src /路由

这就是您的应用程序的精髓-页面和服务器路由。有关多汁的详细信息，请参见“  ”部分。

### 静态的

这是放置您的应用程序使用的任何文件（字体，图像等）的地方。例如static/favicon.png将用作/favicon.png。

Sapper不提供这些文件-您通常会使用或但它将读取static文件夹的内容，以便您可以轻松生成用于离线支持的缓存清单（请参阅） 。

## rollup.config.js / webpack.config.js

Sapper可以使用或捆绑您的应用程序。您可能不需要更改配置，但是如果愿意（例如添加新的加载程序或插件），则可以。

