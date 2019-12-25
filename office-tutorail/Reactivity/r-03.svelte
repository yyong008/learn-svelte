<script>
let count = 0;
$: if(count >= 10) {
  alert(`count is dangerously high!`);
  count = 9
}

$:  console.log(`the count is ${count}`);

$: {
	console.log(`the count is ${count}`);
	alert(`I SAID THE COUNT IS ${count}`);
}

function handleClick() {
  count += 1;
}
</script>

<button>
  Clicked {count} {count === 1 ? 'time' : 'times'}
</button>