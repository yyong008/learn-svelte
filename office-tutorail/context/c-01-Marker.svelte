<script>
  import { getContext} from 'svelte'
  import { mapbox, key } from './c-01-mapbox'

  const { getMap } = getContext(key);
  cosnt map = getMap();

  export let lat;
  export let lon;
  export let label;

  const popup = new mapbox.Popup({ offset: 25 }).setText(label)

  const maker = new mapbox.Maker()
    .setLngLat([lon, lat])
    .setPopup(popup)
    .addTo(map)
</script>