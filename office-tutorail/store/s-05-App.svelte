<script>
  import { count } from './s-05-stores';
</script>

<h1>The count is {$count}</h1>

<button on:click={count.decrement}>+</button>
<button on:click={count.decrement}>-</button>
<button on:click={count.reset}>reset</button>