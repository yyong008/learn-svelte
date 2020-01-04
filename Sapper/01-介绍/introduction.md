---
标题：简介
---

# 开始之前

> Sapper处于早期开发阶段，在我们发布1.0版之前，某些情况可能会发生变化。本文档正在进行中。如果遇到问题，请在[Discord聊天室](https://svelte.dev/chat)中寻求帮助。
>有关从较旧版本升级的帮助，请参见[迁移指南]（正在迁移）。

## 什么是Sapper

Sapper是用于构建超高性能Web应用程序的框架。您现在正在看一个！有两个基本概念：

*您应用的每个页面都是`[Svelte](https://svelte.de)`组件
*通过将文件添加到项目的`src / routes`目录中来创建页面。这些内容将通过服务器呈现，以便用户首次访问您的应用程序时尽可能快，然后由客户端应用程序接管

使用所有现代最佳实践构建应用程序-代码拆分，脱机支持，带有客户端水合的服务器渲染视图-非常复杂。 Sapper为您完成所有无聊的工作，以便您可以继续进行创意部分。

您无需了解Svelte即可了解本指南的其余部分，但会有所帮助。简而言之，这是一个UI框架，可将您的组件编译为高度优化的原始JavaScript。阅读[介绍性博客文章](https://svelte.dev/blog/svelte-3-rethinking-reactivity)和[教程](https://svelte.dev/tutorial)以了解更多信息。

### 为什么叫名字

在战争中，建造桥梁，修路，清除雷区并进行拆除的士兵（都在战斗条件下）被称为“工兵”。

对于网络开发人员来说，风险通常比战斗工程师要低。但是，我们面临着自己的敌对环境：设备动力不足，网络连接不良以及前端工程固有的复杂性。 Sapper是`<b> S </b> velte <b> app </b> mak <b> er </b>`的缩写，是您勇敢而忠诚的盟友。

### 与Next.js的比较

[Next.js](https://github.com/zeit/next.j)是[Zeit](https://zeit.co)的React框架，也是Sapper的灵感来源。但是，有一些明显的区别：

* Sapper由Svelte而非React提供动力，因此速度更快且您的应用更小
*我们将路由参数编码为文件名，而不是路由屏蔽（请参见下面的[routing]（docs＃Routing）部分）
*和*页面*一样，您也可以在`src / routes`目录中创建*服务器路由*。例如，这使得添加JSON API（例如为该页面提供动力的JSON API）非常容易（尝试访问[/docs.json](/docs.json））
*链接只是`<a>`元素，而不是特定于框架的`<Link>`组件。举例来说，这意味着[这个链接就在这里]（/）尽管位于markdown区域内，但仍可以像您期望的那样与路由器一起使用.

### 入门

开始构建Sapper应用程序的最简单方法是使用[degit](https://github.com/Rich-Harris)复制[sapper-template](https://github.com/sveltejs/sapper-template) ：

```bash
npx degit "sveltejs/sapper-template#rollup" my-app
# or: npx degit "sveltejs/sapper-template#webpack" my-app
cd my-app
npm install
npm run dev
```

这将在my-app目录中搭建一个新项目，安装其依赖项，并在[localhost:3000](http://localhost:3000)上启动服务器。尝试编辑文件以了解一切工作原理–您可能无需费心阅读本指南的其余部分！
