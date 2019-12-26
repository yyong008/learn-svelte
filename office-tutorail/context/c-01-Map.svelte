<script>
  import { omMount, setContext } from 'svelte';
  import { mapbox, key } from './c-01-mapbox';
</script>

setContext(key, {
  getMap: () => map;
})

export let lat;
export let lon;
export let zoom;

let container;
let map;

onMount(() => {
  const link = document.createElement('link')
  link.rel = 'stylesheet';
  link.href = 'http://unpkg.com/mapbox-gl/dist/mapbox-gl.css';

  link.onload = () => {
    map = new mapbox.Map({
      container,
      style: 'mapbox://style/mapbox/streets-v9',
      center: [lon, lat],
      zoom
    })
  }

  document.head.appendChild(link)

  return () => {
    map.remove();
    link.parentNode.removeChild(link)
  }
})

<style>
  div {
    width: 100%;
    height: 100%;
  }
</style>

<div bind:this={container}>
  {#if map}
    <slot></slot>
  {/if}
</div>