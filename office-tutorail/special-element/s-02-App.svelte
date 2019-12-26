<script>
  import RedThing from './s-02-RedThing';
  import GreenThing from './s-02-GreenThing'
  import BlueThing from './s-02-BlueThing'

  const options = [
    { color: 'red',   component: RedThing   },
		{ color: 'green', component: GreenThing },
		{ color: 'blue',  component: BlueThing  },
  ]

  let selected = options[0];
</script>

<select bind:value={selected}>
  {#each options as option}
    <option value={option}>{option.color}</option>
  {/each}
</select>

<svelte:component bind:this={selected.component}></svelte:component>