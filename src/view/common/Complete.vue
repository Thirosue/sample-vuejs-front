<template>
  <p>callback</p>
</template>

<script>
export default {
  created () {
    const to = this.$router.history.current.query.to;
    this.$router.push(to);
  }
}
</script>