<script>
  import { fade } from 'svelte/transition';
  let visiable = true;
</script>

<label>
  <input type="checkbox" bind:checked={visiable}>
</label>

{#if visiable}
  <p transition:fade>
    Fades in and out
  </p>
{/if}