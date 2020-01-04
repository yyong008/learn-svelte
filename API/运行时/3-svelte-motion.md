# svelte/motion

该 svelte/motion 模块导出两个函数 tweened 和 spring，用于创建可写存储，其值在 set 和之后 update（而不是立即）随时间变化。

## tweened 补间动画

```text
store = tweened(value: any, options)
```

补间的商店会在固定时间内更新其值。提供以下选项：

- delay（number，默认值 0）-开始之前的毫秒数
- duration（number，默认值为 400）-补间持续的毫秒数
- easing（function，default t => t）— 缓动函数
- interpolate（function）-参见下文

store.set 并且 store.update 可以接受第二个 options 参数，该参数将覆盖实例化时传递的选项。

这两个函数都返回一个 Promise，在补间完成时解决。如果补间中断，则诺言将永远无法解决。

开箱即用，Svelte 将在两个数字，两个数组或两个对象之间进行插值（只要数组和对象是相同的“形状”，并且它们的“叶子”属性也是数字）。

```js
import { tweened } from 'svelte/motion'
import { cubicOut } from 'svelte/easing'

const size = tweend(1, {
  duration: 300,
  easing: cubicOut,
})

function handleClick() {
  // this is equivalent to size.update(n => n + 1)
}

;<button
  on:click={handleClick}
  style='transform: scale({$size}); transform-origin: 0 0'
>
  embiggen
</button>
```

如果初始值为 undefined 或 null，则第一个值更改将立即生效。当您具有基于属性的补间值并且在组件首次渲染时不希望任何运动时，此功能很有用。

```js
const size = tweened(undefined, {
  duration: 300,
  easing: cubicOut,
})

$: $size = big ? 100 : 10
```

该 interpolate 选项允许用户之间的补间任何的任意值。它必须是一个(a, b) => t => value 函数，其中 a 是起始值，b 目标值，t0 到 1 之间的数字和 value 结果。例如，我们可以使用 d3 插值包在两种颜色之间平滑插值。

```js
import { interpolateLab } from 'd3-interpolate'
import { tweened } from 'svelte/motion'

const colors = ['rgb(255, 62, 0)', 'rgb(64, 179, 255)', 'rgb(103, 103, 120)']

const color = tweened(colors[0], {
  duration: 800,
  interpolate: interpolateLab,
})
```

```html
{#each colors as c}
<button
  style="background-color: {c}; color: white; border: none;"
  on:click="{e => color.set(c)}"
></button>
{/each}

<h1 style="color: {$color}">{$color}</h1>
```

## spring

```js
store = spring(value: any, options)
```

一个spring店逐步变为基于其其目标值stiffness和damping参数。而tweened存储在改变一个固定的持续时间其值，spring存储于通过他们现有的速度确定的持续时间的变化，从而允许更似乎自然运动在许多情况下。提供以下选项：

- stiffness（number，default 0.15）— 0到1之间的值，其中较高的值表示弹簧“更紧”
- damping（number，default 0.8）— 0到1之间的值，其中lower表示“ springier”弹簧
- precision（number，default 0.001）—确定认为弹簧已“稳定”的阈值，其中越低意味着越精确

store，set并update返回一个承诺，如果解决了春天了事。的store.stiffness和store.damping，而弹簧在运动特性可以改变的，并会立即生效。

二者set并update可以采取第二个参数-与对象hard或soft属性。{ hard: true }立即设置目标值；在沉降之前{ soft: n }将现有动量保持n几秒钟。{ soft: true }等同于{ soft: 0.5 }。

```js
<script>
	import { spring } from 'svelte/motion';

	const coords = spring({ x: 50, y: 50 }, {
		stiffness: 0.1,
		damping: 0.25
	});
</script>
```

如果初始值为undefined或null，则第一个值更改将立即生效，就像使用tweened值一样（请参见上文）。

```js
const size = spring();
$: $size = big ? 100 : 10;
```
