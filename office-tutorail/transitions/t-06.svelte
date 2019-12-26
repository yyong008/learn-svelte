<script>
  import { fly } from 'svelte/transition'
  let visible = true;
  let status = 'waiting';
</script>

<p>status: {status}</p>

<label><input type="checkbox" bind:checked={visible}></label>

{#if visible}
  <p
    transition:fly="{{ y: 200, duration: 2000 }}"
    on:introstart="{() => status = 'intro started'}"
    on:outstart="{() => status = 'outro started'}"
    on:introend="{() => status = 'intro started'}"
    on:outend="{() => status = 'outro ended'}"
  >
    Files in and out
  </p>
{/if}