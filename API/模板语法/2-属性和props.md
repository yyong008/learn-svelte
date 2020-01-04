# attrs 和 props

## 默认情况下，属性的工作方式与HTML对应项完全相同。

```html
<div class="foo">
	<button disabled>can't touch this</button>
</div>
```

## 与HTML中一样，值可以不加引号。

```html
<input type=checkbox />
```

## 属性值可以包含JavaScript表达式。

```html
<a href="page/{p}">page {p}</a>
```

或者它们可以是 JavaScript表达式。

```js
<button disabled={!clickable}>...</button>
```

## 表达式中可能包含会导致常规HTML中语法突出显示失败的字符，因此允许使用引号。引号不影响值的解析方

```js
<button disabled="{number !== 42}">...</button>
```

## 属性名称和值匹配（name={name}）时，可以将它们替换{name}。

```js
<!-- These are equivalent -->
<button disabled={disabled}>...</button>
<button {disabled}>...</button>
```

按照惯例，传递到部件的值被称为属性或props而不是属性，它们是DOM的特征。

```js
<Widget foo={bar} answer={42} text="hello"/>
```

与元素一样，name={name}可以用{name}速记代替。

传播属性允许将许多属性或属性立即传递到元素或组件。

元素或组件可以具有多个散布属性，并散布有常规散布属性。

```html
<Widget {...things}/>
```

`$$props`引用传递给组件的所有道具，包括未使用声明的道具export。它在极少数情况下很有用，但通常不建议使用，因为Svelte难以优化。

```html
<Widget {...$$props}/>
```
