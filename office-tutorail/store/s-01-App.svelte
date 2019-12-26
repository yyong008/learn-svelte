<script>
  import {count} from './s-01-store'
  import Incrementer from './s-01-Incrementer'
  import Decrementer from './s-01-Decreamter'
  import Resetter from './s-01-Resetter'

  let count_value;

  const unsubscribe = count.subscribe(value => {
    count_value = value;
  });
</script>

<h1>The count is {count_value}</h1>

<Incrementer></Incrementer>
<Decrementer></Decrementer>
<Resetter></Resetter>