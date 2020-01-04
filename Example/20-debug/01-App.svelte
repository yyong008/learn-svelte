<script>
  let user = {
    firstname: 'Ada',
    lastName: 'LoveLace'
  }
</script>

<input bind:value={user.firstname}>
<input bind:value={user.lastname}>

{@debug user}

<h1>Hello {user.firstname}!</h1>