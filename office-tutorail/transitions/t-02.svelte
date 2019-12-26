<script>
  import { fly } from 'svelte/transition';
  let visible = true;
</script>

<label for="">
  <input type="checkbox" bind:checked={visible}>
  visible
</label>

{#if visible}
  <p transition:fly="{{y: 200, duration: 2000}}">
    Files in and out
  </p>
{/if}