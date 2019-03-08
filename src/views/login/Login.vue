<template>
<div>
  <section class="hero">
    <div class="hero-body">
      <div class="container">
        <h1 class="title">
          Login Form
        </h1>
      </div>
    </div>
  </section>
  <div class="container is-fullhd">
    <div class="notification">
      <form-input
        id="email"
        v-model.trim="form.items.email.value"
        v-bind:formItem="form.items.email"
        v-bind:maxlength="form.items.email.maxlength"
        label="メールアドレス（必須）"
        type="email"
        autocomplete="email"
        rule="required"
        dirty
        touched
        v-bind:keyUpHandler="signin"
      />
      <form-input
        id="password"
        v-model="form.items.password.value"
        v-bind:formItem="form.items.password"
        label="パスワード（必須）"
        type="password"
        autocomplete="password"
        dirty
        touched
        v-bind:keyUpHandler="signin"
      />

      <div v-if="errMsg" class="notification is-danger">
        {{errMsg}}
      </div>

      <div class="field is-grouped is-grouped-centered">
        <button
          id="form-submit"
          class="button is-link"
          type="submit"
          :disabled="form.invalid"
          v-on:click.prevent="signin">Login</button>
      </div>
    </div>
  </div>
  <sample-footer></sample-footer>
</div>
</template>

<script>
import { FormInput } from '@/components/form';
import { LoginForm } from '@/forms';
import { SESSION_GETTER_TYPES, SESSION_MUTATION_TYPES } from '@/store/modules/session';
import Config from '@/conf/Config';
import ErrorHandler from '@/module/ErrorHandler';
import { LOGIN_MESSAGE } from '@/conf/message';
import { authApi } from '@/module/Api';

export default {
  name: 'Login',

  components: {
    FormInput,
  },

  beforeRouteEnter(to, from, next) {
    next((vm) => {
      if (from.path === Config.LOGOUT_PATH) {
        vm.$showToast(LOGIN_MESSAGE.LOGOUTED, 'none');
      }
    });
  },

  data() {
    const form = new LoginForm();
    return {
      form,
      errMsg: null,
    };
  },

  mounted() {
    console.log(this.$store.getters[SESSION_GETTER_TYPES.VALUES]);
  },

  methods: {
    signin() {
      const value = this.form.values();
      console.log(value);
      authApi.doAuth(value)
        .then((response) => {
          this.$store.commit(SESSION_MUTATION_TYPES.SET_VALUES, response.data[0]);
          this.$router.push('/');
        })
        .catch((error) => {
          if (error.response.status === 401) {
            this.errMsg = LOGIN_MESSAGE.ERR_AUTH;
          } else {
            ErrorHandler.apiHandleErr(error.response);
          }
        });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
