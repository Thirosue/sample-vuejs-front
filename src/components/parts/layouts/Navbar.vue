<template>
<nav class="navbar is-light">
  <div class="navbar-brand">
    <a class="navbar-item" href="#">
      <img src="https://bulma.io/images/bulma-logo.png" alt="Bulma: a modern CSS framework based on Flexbox" width="112" height="28">
    </a>
  </div>

  <div id="navbarExampleTransparentExample" class="navbar-menu">
    <div class="navbar-start">
      <router-link class="navbar-item" to="/">Home</router-link>

      <div class="navbar-item has-dropdown is-hoverable">
        <router-link class="navbar-link" to="/staffList">
          担当者管理
        </router-link>
        <div class="navbar-dropdown is-boxed">
          <router-link class="navbar-item" to="/staffList">担当者一覧</router-link>
          <router-link class="navbar-item" to="/staffList">担当者登録</router-link>
        </div>
      </div>

    </div>

    <div class="navbar-end">
      <div class="navbar-item">
        <div class="field is-grouped">
          <p class="control">
            <a class="button is-info" v-on:click.stop.prevent="logout">
              <span>Logout</span>
            </a>
          </p>
        </div>
      </div>
    </div>
  </div>
</nav>
</template>

<script>
import handler from '@/module/errorHandler'
import Config from '@/conf/config'

export default {
  name: 'Navbar',
  methods: {
    logout() {
      this.$store.dispatch('session/logout')
                    .then(()=>this.$router.push(Config.LOGIN_PATH))
                    .catch(handler.apiHandleErr)
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>