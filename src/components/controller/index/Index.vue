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
      <section class="hero">
        <div class="hero-body">
          <div class="container">
            <h1 class="title">
              Modal Test
            </h1>
            <nav class="level">
              <div class="level-right">
                <div class="level-item">
                  <button class="button is-link" type="submit" v-on:click.stop.prevent="open">シンプル</button>
                </div>
                <div class="level-item">
                  <button class="button is-link" type="submit" v-on:click.stop.prevent="openWithTitle">タイトル付き</button>
                </div>
                <div class="level-item">
                  <button class="button is-link" type="submit" v-on:click.stop.prevent="openWithTitleAndSuccess">コールバック付き（OK）</button>
                </div>
                <div class="level-item">
                  <button class="button is-link" type="submit" v-on:click.stop.prevent="openWithTitleAndSuccessAndError">コールバック付き（OK/NG）</button>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </section>
      <section class="hero">
        <div class="hero-body">
          <div class="container">
            <h1 class="title">
              Toast Test
            </h1>
            <nav class="level">
              <div class="level-right">
                <div class="level-item">
                  <button class="button is-link" type="submit" v-on:click.stop.prevent="toast">トップ</button>
                </div>
                <div class="level-item">
                  <button class="button is-link" type="submit" v-on:click.stop.prevent="toastBottom">ボトム ※要位置調整</button>
                </div>
                <div class="level-item">
                  <button class="button is-link" type="submit" v-on:click.stop.prevent="toastWith5Second">トップ（5秒まち）</button>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </section>
    </div>
    <sample-footer></sample-footer>
  </div>
</template>

<script>
export default {
  mounted() {
    if(this.$store.state.session.loggedin) {
      this.$showToast('ログインしました')
    }
  },
  methods: {
    open() {
      this.$showModal('hoge')
    },
    openWithTitle() {
      this.$showModal('hoge','title')
    },
    openWithTitleAndSuccess() {
      this.$showModal('hoge','title',()=>{console.log('call success callback!')})
    },
    openWithTitleAndSuccessAndError() {
      this.$showModal('hoge','title', ()=>{console.log('call success callback!')}, ()=>{console.log('call error callback!')})
    },
    toast() {
      this.$showToast('show simple toast', 'info', 'top')
    },
    toastBottom() {
      this.$showToast('show simple toast', 'info', 'bottom')
    },
    toastWith5Second() {
      this.$showToast('show simple toast', 'info', 'top', 5000)
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
