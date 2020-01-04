# Sapper

## Web 开发中的下一件小事

Sapper是一个用于构建各种规模的Web应用程序的框架，具有出色的开发经验和灵活的基于文件系统的路由。

与单页应用程序不同，Sapper不会在SEO，渐进增强或初始加载体验上做出让步-但与传统的服务器呈现的应用程序不同，导航是即时的，类似于应用程序的感觉。

[Read the introductory blog post](https://svelte.dev/blog/sapper-towards-the-ideal-web-app-framework)以了解更多信息。

## 介绍

- 由 Svelte 支持
- 服务端呈现和SEO，SPA的流程
- 建立快速： 高级路由，服务端渲染，代码拆分，脱机支持等功能。

## 安装 Sapper

```sh
# for Rollup
npx degit "sveltejs/sapper-template#rollup" my-app
# for webpack
npx degit "sveltejs/sapper-template#webpack" my-app
cd my-app

npm install
npm run dev & open http://localhost:3000
```
