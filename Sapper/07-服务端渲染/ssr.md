# 服务器端渲染

默认情况下，Sapper首先呈现服务器端（SSR），然后在客户端上重新装入所有动态元素。svelte为提提供了丰富的支持。这在性能和搜索引擎索引编制等方面都有好处，但也有其自身的复杂性。

## 使组件SSR兼容

Sapper与您可能会遇到的大多数第三方库配合良好。但是，有时第三方库以某种方式捆绑在一起，使其可以与多个不同的模块加载器一起使用。有时，此代码创建对的依赖关系window，例如检查是否window.global可能存在。

由于没有window像Sapper这样的服务器端环境，因此简单地导入此类模块的操作可能会导致导入失败，并以如下错误终止Sapper的服务器：

```sh
ReferenceError: window is not defined
```

解决此问题的方法是从onMount函数内部（仅在客户端上调用）对组件使用动态导入，这样就永远不会在服务器上调用导入代码。

```html
<script>
  import { onMount } from 'svelte';

  let MyComponent;

  onMount(async () => {
    const module = await import('my-non-ssr-component');
    MyComponent = module.default;
  });
</script>

<svelte:component this={MyComponent} foo="bar"/>
```
