<template>
<nav class="navbar is-light">
  <div class="navbar-brand">
    <a class="navbar-item" href="#">
      <img  width="112" height="28"
          src="https://bulma.io/images/bulma-logo.png"
          alt="Bulma: a modern CSS framework based on Flexbox">
    </a>
  </div>

  <div id="navbarExampleTransparentExample" class="navbar-menu">
    <div class="navbar-start">
      <router-link class="navbar-item" to="/">Home</router-link>

      <div :key="i"
        class="navbar-item has-dropdown is-hoverable"
        v-for="(category, i) in menuCategories"
      >
        <a class="navbar-link" href="javascript:void(0)">
          {{category.name}}
        </a>
        <div class="navbar-dropdown is-boxed">
          <!-- eslint-disable vue/no-use-v-if-with-v-for -->
          <router-link :key="j"
              class="navbar-item"
              v-if="category.category === menu.category"
              v-for="(menu, j) in menus" :to="menu.url"
          >{{menu.name}}</router-link>
        </div>
      </div>
    </div>

    <div class="navbar-end">
      <div class="navbar-item">
        <div class="field is-grouped">
          <p class="control">
            <router-link  type="submit"
                class="button is-text"
                v-bind:to="'/inquiry'"
            >お問い合わせ</router-link>
          </p>
        </div>
      </div>
      <div class="navbar-item">
        <div class="field is-grouped">
          <p class="control">
            <router-link type="submit"
              class="button is-text"
              v-bind:to="'/passwordEdit'"
            >パスワード変更</router-link>
          </p>
        </div>
      </div>
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
import Config from '@/conf/Config';

export default {
  name: 'Navbar',
  methods: {
    logout() {
      this.$router.push(Config.LOGOUT_PATH);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
