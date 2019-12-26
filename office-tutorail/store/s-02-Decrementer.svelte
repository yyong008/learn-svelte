<script>
  import { count } from './s-02-store'

  function decrement() {
    count.update(n => n -1)
  }
</script>

<button on:click={decrement}>
  -
</button>