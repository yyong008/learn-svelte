<script>
  let i = 0;
  let undoStack = [[]];
  let circles = [];
  let selected;
  let adjusting = false;
  let adjusted = false;

  function handleClick(event) {}

  function adjust(event) {}

  function select(circle, event) {}

  function travel(d) {}

  function clone(circles) {}
</script>

<style>
  .controls {
    position: absolute;
    width: 100%;
    text-align: center;
  }

  svg {
    background-color: #eee;
    width: 100%;
    height: 100%;
  }

  circle {
    stroke: black;
  }

  .adjuster {
    position: absolute;
    width: 80%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 1em;
    text-align: center;
    background-color: rgba(255, 255, 255, 0.7);
    border-radius: 4px;
  }

  input[type="range"] {
    width: 100%;
  }
</style>

<div class="controls">
  <button on:click={() => travel(-1)} disabled={i === 0}>undo</button>
  <button on:click={() => travel(+1)} disabled={i === undoStack.length - 1}>
    redo
  </button>
</div>

<svg on:click={handleClick} >
	{#each circles as circle}
		<circle cx={circle.cx} cy={circle.cy} r={circle.r}
			on:click="{event => select(circle, event)}"
			on:contextmenu|stopPropagation|preventDefault="{() => {
				adjusting = !adjusting;
				if (adjusting) selected = circle;
			}}"
			fill="{circle === selected ? '#ccc': 'white'}"
		/>
	{/each}
</svg>

{#if adjusting}
	<div class="adjuster">
		<p>adjust diameter of circle at {selected.cx}, {selected.cy}</p>
		<input type="range" value={selected.r} on:input={adjust}>
	</div>
{/if}