<script>
  import RedThing from './02-RedThing'
  import BlueThing from './02-BlueThing'
  import GreenThing from './02-02-GreenThing'

  const options = [
    { color: 'red',   component: RedThing   },
		{ color: 'green', component: GreenThing },
		{ color: 'blue',  component: BlueThing  },
  ];

  let selected = options[0]
</script>

<select bind:value={selected}>
  {#each options as option}
    <option value={option}>{option.color}</option>
  {/each}
</select>

<svelte:component this={selected.component}></svelte:component>