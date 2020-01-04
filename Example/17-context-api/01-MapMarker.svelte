<script>
  import { getContent } from 'svelte';
  import { mapbox, key } from './01-mapbox';

  const { getMap } = getContent(key);
  const map = getMap();

  export let lat;
  export let lon;
  export let label;

  const popup = new mapbox.Popup({ offset: 25 }).setText(label)

  const marker = new mapbox.Marker().setLngLat([long, lat])
                          .setPopup(popup)
                          .addTo(map)
</script>