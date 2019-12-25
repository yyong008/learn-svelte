<script>
let numbers = [1,2,3,4];

function addNumber() {
  numbers.push(numbers.length + 1)
}

$: sum = numbers.reduce((t, n) => t+n)
</script>

<p>{numbers.join(' + ')} = {sum}</p>

<button on:click={addNumber}>
	Add a number
</button>