<script>
  import { time } from './s-03-store'

  const formatter = new Intl.DateTimeFormat('en', {
    hour12: true,
		hour: 'numeric',
		minute: '2-digit',
		second: '2-digit'
  });
</script>

<h1>The time is {formatter.format($time)}</h1>
