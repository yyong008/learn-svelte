<script>
	let cats = [
		{ id: 'J---aiyznGQ', name: 'Keyboard Cat' },
		{ id: 'z_AbfPXTKms', name: 'Maru' },
		{ id: 'OUtn3pvWmpg', name: 'Henri The Existential Cat' }
	];
</script>

<h1>The Famous Cats of YouTube</h1>

<ul>
{#each cats as {id, name}, i}
   <li><a target="_blank" href="https://www.youtube.com/watch?v={id}">
			{i + 1}: {name}
		</a></li>
{/each}
</ul>

{#each items as item}
   <!-- content here -->
{/each}

{#each items as item}
   <!-- content here -->
{:else}
   <!-- empty list -->
{/each}

{#each items as item,i}
   <!-- content here -->
{/each}

{#each items as item,i (key)}
   <!-- content here -->
{/each}

{#each items as item,(key)}
   <!-- content here -->
{/each}