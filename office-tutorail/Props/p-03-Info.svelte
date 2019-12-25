<script>
  export let name
  export let version
  export let speed
  export let website
</script>

<p>
The <code>{name}</code>package is {speed} fast.
Download version {version} from <a href="https://www.npmjs.com/package/{name}">npm</a>
	and <a href={website}>learn more here</a>
</p>

// 相反，如果您需要引用传递到组件中的所有道具，包括未使用声明的道具，则export可以$$props直接访问。通常不建议这样做，因为Svelte难以优化，但在极少数情况下很有用。