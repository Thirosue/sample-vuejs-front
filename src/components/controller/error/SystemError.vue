<template>
　<div>
    <div class="container is-fullhd">
      <article class="message is-danger">
        <div class="message-header">
          <p>システムエラー</p>
        </div>
        <div class="message-body" v-if="isShow">
          {{stackTrace}}
        </div>
      </article>
      <a href="#" onClick="history.back(); return false;">前のページにもどる</a><br/>
      <router-link to="/login">ログインページ</router-link>
    </div>
    <sample-footer></sample-footer>
  </div>
</template>

<script>
export default {
  name: 'SystemError',
  computed: {
    isShow() {
      return this.$store.state.stackTrace !== null && this.$store.state.mode !== 'production'
    },
    stackTrace() {
      return this.$store.state.stackTrace
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
