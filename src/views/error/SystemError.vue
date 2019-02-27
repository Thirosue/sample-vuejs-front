<template>
　<div>
    <section class="hero">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            システムエラー
          </h1>
        </div>
      </div>
    </section>
    <div class="container is-fullhd" v-if="isShow">
      <article class="message is-danger">
        <div class="message-header">
          <p>StackTrace</p>
        </div>
        <div class="message-body">
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
      return this.$store.state.stackTrace !== null && this.$store.state.mode !== 'production';
    },
    stackTrace() {
      return this.$store.state.stackTrace;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
