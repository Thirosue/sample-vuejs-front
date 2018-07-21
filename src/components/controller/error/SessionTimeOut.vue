<template>
　<div>
    <div class="container is-fullhd">
      <article class="message is-dark">
        <div class="message-header">
          <p>セッションタイムアウト</p>
        </div>
        <div class="message-body">
          セッションがタイムアウトしました。<br/>
          もう一度ログインしてください。
        </div>
      </article>
      <router-link to="/login">ログインページ</router-link>
    </div>
    <sample-footer></sample-footer>
  </div>
</template>

<script>
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
