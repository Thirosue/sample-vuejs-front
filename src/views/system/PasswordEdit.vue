<template>
<div>
  <sample-navbar></sample-navbar>
  <section class="hero">
    <div class="hero-body">
      <div class="container">
        <h1 class="title">
          パスワード変更
        </h1>
      </div>
    </div>
  </section>
  <div class="container is-fullhd">
    <div class="container is-fullhd">
      <div class="sample-detail-area">
        <table class="table  is-bordered is-striped is-narrow is-fullwidth" >
          <tbody>
            <tr>
              <th>新しいパスワード</th>
              <td>
                <form-input
                  id="password"
                  v-model.trim="form.items.password.value"
                  v-bind:formItem="form.items.password"
                  v-bind:minlength="form.items.password.minlength"
                  v-bind:maxlength="form.items.password.maxlength"
                  type="password"
                  autocomplete="password"
                  dirty
                  touched
                />
              </td>
            </tr>
            <tr>
              <th>新しいパスワード（確認用）</th>
              <td>
                <form-input
                  id="passwordConfirm"
                  v-model.trim="form.items.passwordConfirm.value"
                  v-bind:formItem="form.items.passwordConfirm"
                  v-bind:minlength="form.items.passwordConfirm.minlength"
                  v-bind:maxlength="form.items.passwordConfirm.maxlength"
                  type="password"
                  dirty
                  touched
                />
              </td>
            </tr>
          </tbody>
        </table>

        <div v-if="errMsg" class="notification is-danger">
          {{errMsg}}
        </div>

        <div class="field is-grouped is-grouped-centered">
          <button
            id="form-submit"
            class="button is-link"
            type="submit"
            :disabled="disableAction"
            v-on:click.stop.prevent="changePassword">更新</button>
        </div>
      </div>
    </div>
  </div>
  <sample-footer></sample-footer>
</div>
</template>

<script>
import { PasswordUpdateForm } from '@/forms';
import ErrorHandler from '@/module/ErrorHandler';
import { staffApi } from '@/module/Api';
import { COMMON_MESSAGE, PASSWORD_MESSAGE } from '@/conf/message';
import { BaseUpdate } from '@/views/base';
import { MUTATION_TYPES } from '@/store';

export default {
  mixins: [BaseUpdate],

  data() {
    const form = new PasswordUpdateForm();
    return {
      form,
      errMsg: '',
    };
  },

  methods: {
    async changePassword() {
      this.$store.commit(MUTATION_TYPES.SET_PROCESSING, true);
      const data = { ...{ id: this.session.id }, ...this.form.values() };
      staffApi.changePassword(data)
        .then(() => {
          this.$store.commit(MUTATION_TYPES.SET_PROCESSING, false);
          this.$showModal(COMMON_MESSAGE.UPDATED, '', () => this.$router.push('/'));
        })
        .catch((error) => {
          if (error.response.status === 400) {
            this.errMsg = PASSWORD_MESSAGE.SAME_PASSWORD;
          } else {
            ErrorHandler.apiHandleErr(error.response);
          }
        });
    },
  },

  computed: {
    screenId: () => 'EDIT_PASSWORD',
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
