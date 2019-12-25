<script>
import Outer from './e-05-Outer'

function handleMessage(event) {
  alert(event.detail.text)
}
</script>

<Outer on:message={handleMessage}></Outer>