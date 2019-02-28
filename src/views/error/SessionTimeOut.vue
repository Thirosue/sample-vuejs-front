<template>
  <div>
    <section class="hero">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            セッションタイムアウト
          </h1>
        </div>
      </div>
    </section>
    <div class="container is-fullhd">
      <article class="message is-dark">
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
