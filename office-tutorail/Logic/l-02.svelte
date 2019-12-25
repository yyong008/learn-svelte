<script>
let user = {loggedIn: false}

function toggle() {
  user.loggedIn = !user.loggedIn
}
</script>

{#if user.loggedIn}
  <button onclick={toggle}>
    log out
  </button>
{:else}
   <button onclick={toggle}>
    log in
  </button>
{/if}