<template>
  <p>callback</p>
</template>

<script>
export default {
  created() {
    const { to } = this.$router.history.current.query;
    this.$router.push(to);
  },
};
</script>
