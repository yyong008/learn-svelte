<script>
  import { count } from './s-02-store';

  function reset() {
    count.set(0)
  }
</script>

<button on:click={reset}>reset</button>