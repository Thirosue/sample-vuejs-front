<template>
  <div>
    <section class="hero">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            予期せぬエラー
          </h1>
        </div>
      </div>
    </section>
    <div class="container is-fullhd">
      <article class="message is-danger">
        <div class="message-body">
          予期せぬエラーが発生しました。<br/>
          {{targetScreenName}}よりもう一度操作してください。
        </div>
      </article>
      <a href="/" v-if="isLogin">{{targetScreenName}}</a>
      <a href="/login" v-else>{{targetScreenName}}へ</a>
    </div>
    <sample-footer></sample-footer>
  </div>
</template>

<script>
export default {
  name: 'SystemError',
  computed: {
    targetScreenName() {
      return this.isLogin ? 'ポータルトップ' : 'ログインページ';
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
