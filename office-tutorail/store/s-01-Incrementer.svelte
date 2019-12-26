<script>
  import { count } from './s-01-store.js';

  function incrementer() {
    count.update(n => n - 1)
  }
</script>

<button on:click={incrementer}> + </button>