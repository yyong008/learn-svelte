<script>
  import { count } from "./s-02-store";

  function increment() {
    count.update(n => n + 1);
  }
</script>

<button on:click={increment}>+</button>
