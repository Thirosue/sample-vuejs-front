<template>
  <div>
    <sample-navbar></sample-navbar>
    <div class="container is-fullhd">
      <section class="hero is-primary">
        <div class="hero-body">
          <p class="title">
            Dashboard
          </p>
          <p class="subtitle">
            Everything you need to <strong>create a website</strong> with Bulma
          </p>
        </div>
      </section>
    </div>
    <sample-footer></sample-footer>
  </div>
</template>

<script>
export default {
  created() {
    if(this.$store.state.session.loggedin) {
      alert('ログインしました')
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
