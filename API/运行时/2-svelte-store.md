# svelte/store

该svelte/store模块导出用于创建功能。

## writable

```js
store = writable(value: any)
store = writable(value: any, (set: (value: any) => void) => () => void)
```

创建具有可从“外部”组件设置的值的存储的函数。它被创建为带有其他set和update方法的对象。

set是一种采用一个参数（即要设置的值）的方法。如果存储值尚未等于参数值，则将其设置为该参数的值。

update是一种采用一个参数（即回调）的方法。回调将现有商店值作为其参数，并返回要设置到商店的新值。

```js
import { writable } from 'svelte/store';

const count = writable(0);

count.subscribe(value => {
	console.log(value);
}); // logs '0'

count.set(1); // logs '1'

count.update(n => n + 1); // logs '2
```

我们可以看到 store 上的 writable 函数类似于 useState 函数，调用之后生成赋值到 count 变量，是一个对象。这个对象是可以操作做的。

```js
let count = {
  subscribe: () => void
  set: () => void
  update: () => void
}
```

其中 subscribe 函数和 update 函数的参数都是函数。

- 访问，需要订阅之后才能访问
- 设置，调用 set 设置
- 更新，更新需要显示的调用update函数

如果将函数作为第二个参数传递，则当订阅者的数量从零变为一（而不是从一变为二等）时，将调用该函数。该函数将被传递一个set可更改存储值的函数。它必须返回一个stop当订户数从一变为零时调用的函数。

```js
import { writable } from 'svelte/store';

const count = writable(0, () => {
  console.log('got a subscriber')
  return () => console.log('no more subscribes')
})

count.set(1)

const unsubscribe = count.subscribe(value => {
  console.log(value)
})
unsubscribe()
```

首选要知道 writable 函数是可以传递两个参数。第二个参数是一个函数。

第二参数是函数的时候，会影响set方法的执行。

## readable

```text
store = readable(value: any, (set: (value: any) => void) => () => void)
```

创建一个无法从“外部”设置其值的商店，第一个参数是商店的初始值。

的第二个参数与的第二个参数readable相同writable，不同之处在于必需使用readable（因为否则将无法更新存储值）。

```js
import { reabable} from 'svelte/store';

const time = readable(new Date(), set => {
  const interval = setInterval(() => {
    set(new Date())
  }, 100)

  return () => clearInterval(interval)
})
```

## derived

```text
store = derived(a, callback: (a: any) => any)
store = derived(a, callback: (a: any, set: (value: any) => void) => void | () => void, initial_value: any)
store = derived([a, ...b], callback: ([a: any, ...b: any[]]) => any)
store = derived([a, ...b], callback: ([a: any, ...b: any[]], set: (value: any) => void) => void | () => void, initial_value: any)
```

从一个或多个其他商店派生商店。只要这些依赖项发生更改，回调就会运行。

在最简单的版本中，derived只存储一个存储，回调函数返回一个派生值。

```js
import { derived } from 'svelte/store';

const doubled = derived(a, $a => $a * 2);
```

回调可以通过接受第二个参数set并在适当的时候调用它来异步设置一个值。

在这种情况下，您还可以将第三个参数传递给derived—派生存储的初始值在set第一次被调用之前。

```js
import { derived } from 'svelte/store';

const delayed = derived(a, ($a, set) => {
  setTimeout(() => set($a), 1000)
}, 'one moment')
```

如果您从回调函数返回一个函数，则它将在a）回调函数再次运行或b）最后一个订阅者取消订阅时被调用。

```js
import { derived } from 'svelte/store';

const tick = derived(frequency, ($frequency, set) => {
  const interval = setInterval(() => {
    set(Date.now())
  }, 1000/ $frequency)

  return () => {
    clearInterval(interval)
  }
}, 'one moment...')
```

在这两种情况下，都可以将参数数组作为第一个参数而不是单个存储传递。

```js
import { derived } from 'svelte/store';

const summed = derived([a, b], ([$a, $b]) => $a + $b);

const delayed = derived([a, b], ([$a, $b], set) => {
	setTimeout(() => set($a + $b), 1000);
});
```

## get

```text
value: any = get(store)
```

通常，应订阅存储并使用随时间变化的值来读取存储的值。有时，您可能需要检索未订阅的商店的值。get允许您这样做。

:::tip
这可以通过创建订阅，读取值然后取消订阅来实现。因此，不建议在热代码路径中使用。
:::

```js
import { get } from 'svelte/store';

const value = get(store);
```
