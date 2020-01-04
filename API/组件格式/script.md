# Svelte 组件格式

首先 Svelte 使用 `.svelte` 来定义组件，类似于 Vue 的 .vue 文件。

```svelte
<script>
  // some logic code
</script>

<style>
  // some your style code
</style>

<!-- other is markup -->
```

### export 数据属性

> 看上去很简单

export 的作用是创建一个属性或者 props

```html
<script>
	export let foo;

	// Values that are passed in as props
	// are immediately available
  console.log({ foo });
  
  // 指定默认值
  export let bar = 'optional default value'
  export let baz= undefined

  // const is readonly
  export const thisIs = 'readonly'

  export function greet(name) {
    alert(`Hello ${name}`)
  }

  // this is a prop
  export let format = n => n.toFixed(2)

  // 别名
  let className;
  export {className as class}
</script>
```

### 响应 reacttive

要更改组件状态并触发重新渲染，只需将其分配给本地声明的变量即可。

由于Svelte的反应性是基于分配的，因此使用.push()和这样的数组方法.splice()不会自动触发更新。解决此问题的选项可以在本找到。

```js
<script>
	let count = 0;

	function handleClick () {
		// calling this function will trigger an
		// update if the markup references `count`
		count = count + 1;
	}
</script>

```

### $ 语法被标记为被动

[ JavaScript Statement-label 语法](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/label)

```js
export let title

$: document.title = title

$: {
  console.log(`multiple statements can be combined`)
  console.log(`the current title is ${title}`)
}
```

使用 let 作为默认的声明

```js
export let num;

// we don`t need to decare `square` and `cubed`
// - Svelte does its for us

$: squared = num * num;
$: cubed = squared * num
```

### $ 作为 svelte 的 store 访问前缀

```js
const unsubscribe = store.subscribe(value => {
  console.log(value)
})

// later
unsubscribe()
```

```js
import { writable } from 'svelte/store';

const count = writable(0);
console.log($count) // 0

$count.set(1)
console.log($count) // 1

$count.set(2)
console.log($count) // 2
```