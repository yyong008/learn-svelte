# svelte.walk

```js
walk(ast: Node, {
	enter(node: Node, parent: Node, prop: string, index: number)?: void,
	leave(node: Node, parent: Node, prop: string, index: number)?: void
})
```

该walk函数提供了一种使用编译器自身内置的实例解析器生成的抽象语法树的方法。

助行器需要一个抽象的语法树来行走，并带有两个可选方法的对象：enter和leave。对于每个节点，enter称为（如果存在）。然后，除非this.skip()在期间调用，否则enter将遍历每个子代，然后leave在该节点上调用它们。

```js
const svelte = require('svelte/compiler');

svelte.walk(ast, {
  enter(node, parent, prop, index) {
    do_something(node)
    if(should_skip_children(node)) {
      this.skip();
    }
  },
  leave(node, parent, prop, index) {
		do_something_else(node);
	}
})
```
