<template>
　<div>
    <section class="hero">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            不正な操作
          </h1>
        </div>
      </div>
    </section>
    <div class="container is-fullhd">
      <article class="message is-danger">
        <div class="message-body">
          不正な画面遷移です。<br/>
          トップページよりもう一度操作してください。
        </div>
      </article>
      <router-link to="/">ポータルトップ</router-link>
    </div>
    <sample-footer></sample-footer>
  </div>
</template>

<script>
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
