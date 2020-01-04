# svelte/transition

该 svelte/transition 模块出口六大功能：fade，fly，slide，scale，draw 和 crossfade。它们与 svelte 一起使用 transition。

- fade
- fly
- slide
- scale
- draw
- crossfade

## fade

```text
transition:fade={params}
in:fade={params}
out:fade={params}
```

对元素的不透明度进行动画处理，从 0 到当前的不透明度进行 in 过渡，从当前的不透明度到 0 进行 out 过渡。

fade 接受以下参数：

- delay（number，默认值 0）-开始之前的毫秒数
- duration（number，默认为 400）-转换持续的毫秒数
  您可以 fade 在看到实际的。

```html
<script>
  import { fade } from 'svelte/transition'
</script>

{#if condition}
<div transition:fade="{{delay: 250, duration: 300}}">
  fades in and out;
</div>
{/if}
```

## blur

```text
transition:blur={params}
in:blur={params}
out:blur={params}
```

blur 对元素的不透明度旁边的滤镜进行动画处理。

blur 接受以下参数：

- delay（number，默认值 0）-开始之前的毫秒数
- duration（number，默认为 400）-转换持续的毫秒数
- easing（function，default cubicInOut）— 缓动函数
- opacity（number，默认为 0）-不透明度值，以向和从其中进行动画处理
- amount（number，默认为 5）-模糊大小（以像素为单位）

```html
import { blur } from 'svelte/transition'; {#if condition}
<div transition:blur="{{amount: 10}}">
  fades in and out
</div>
{/if}
```

## fly

```text
transition:fly={params}
in:fly={params}
out:fly={params}
```

对元素的 x 和 y 位置以及不透明度进行动画处理。in 将元素的当前（默认）值的动画过渡到提供的值（作为参数传递）。out 从提供的值过渡到元素的默认值。

fly 接受以下参数：

- delay（number，默认值 0）-开始之前的毫秒数
- duration（number，默认为 400）-转换持续的毫秒数
- easing（function，default cubicOut）— 缓动函数
- x（number，默认为 0）-用于向和向外移动的 x 偏移量
- y（number，默认值为 0）-y 偏移量，以从中和从中进行动画处理
- opacity（number，默认为 0）-不透明度值，以向和从其中进行动画处理
  您可以 fly 在过渡教程中看到实际的过渡。

```html
<script>
  import { fly } from 'svelte/transition'
  import { quintOut } from 'svelte/easing'
</script>

{#if condition}
<div
  transition:fly="{{delay: 250, duration: 300, x: 100, y: 500, opacity: 0.5, easing: quintOut}}"
>
  flies in and out
</div>
{/if}
```

## slide

```text
transition:slide={params}
in:slide={params}
out:slide={params}
```

将元素滑入和滑出。

slide 接受以下参数：

delay（number，默认值 0）-开始之前的毫秒数
duration（number，默认为 400）-转换持续的毫秒数
easing（function，default cubicOut）— 缓动函数

```html
<script>
  import { slide } from 'svelte/transition'
  import { quintOut } from 'svelte/easing'
</script>

{#if condition}
<div transition:slide="{{delay: 250, duration: 300, easing: quintOut}}">
  slides in and out
</div>
{/if}
```

## scale

```text
transition:scale={params}
in:scale={params}
out:scale={params}
```

对元素的不透明度和比例进行动画处理。in 将元素的当前（默认）值的动画过渡到提供的值（作为参数传递）。out 从提供的值过渡到元素的默认值。

scale 接受以下参数：

- delay（number，默认值 0）-开始之前的毫秒数
- duration（number，默认为 400）-转换持续的毫秒数
- easing（function，default cubicOut）—
- start（number，默认为 0）-缩放到和从中进行缩放的比例值
- opacity（number，默认为 0）-不透明度值，以向和从其中进行动画处理

```html
<script>
  import { scale } from 'svelte/transition'
  import { quintOut } from 'svelte/easing'
</script>
{#if condition}
<div
  transition:scale="{{duration: 500, delay: 500, opacity: 0.5, easing: quintOut}}"
>
  scales in and out {/if}
</div>
```

## draw

```text
transition:draw={params}
in:draw={params}
out:draw={params}
```

对 SVG 元素的笔触进行动画处理，就像管中的蛇一样。in 过渡从不可见的路径开始，并随时间在屏幕上绘制路径。out 过渡从可见状态开始并逐渐擦除路径。draw 仅适用于具有 getTotalLength 方法（例如`<path>`和）的元素`<polyline>`。

draw 接受以下参数：

- delay（number，默认值 0）-开始之前的毫秒数
- speed（number，默认为 undefined）-动画的速度，请参见下文。
- duration（number| function，默认值 800）-转换持续的毫秒数
- easing（function，default cubicInOut）—
  该 speed 参数是一种设置相对于路径长度的过渡持续时间的方法。它是应用于路径长度的修饰符：duration = length / speed。速度为 1 的 1000 像素路径的持续时间为 1000ms，将速度设置为 0.5 将使该持续时间加倍，并将其设置为 2 将其减半。

```html
<script>
  import { draw } from 'svelte/transition'
  import { quintOut } from 'svelte/easing'
</script>
```

```xml
<svg viewBox="0 0 5 5" xmlns="http://www.w3.org/2000/svg">
  {#if condition}
  <path
    transition:draw="{{duration: 5000, delay: 500, easing: quintOut}}"
    d="M2 1 h1 v1 h1 v1 h-1 v1 h-1 v-1 h-1 v-1 h1 z"
    fill="none"
    stroke="cornflowerblue"
    stroke-width="0.1px"
    stroke-linejoin="round"
  ></path>
  {/if}
</svg>
```
