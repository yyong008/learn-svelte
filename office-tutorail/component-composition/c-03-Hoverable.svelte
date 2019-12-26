<script>
  let hovering;

  function enter() {
    hovering = true
  }

  function leave() {
    hovering = false
  }
</script>

<div on:mouseenter={enter}>
  <slot hovering={hovering}></slot>
</div>