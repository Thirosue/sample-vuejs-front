<template>
<div>
  <sample-navbar></sample-navbar>
  <section class="hero">
    <div class="hero-body">
      <div class="container">
        <h1 class="title">
          担当者登録
        </h1>
      </div>
    </div>
  </section>
  <div class="container is-fullhd">
    <div class="container is-fullhd">
      <div class="sample-detail-area">
        <table class="table is-bordered is-striped is-narrow is-fullwidth" >
          <tbody>
            <tr>
              <th>苗字</th>
              <td>
                <form-input
                  id="lastName"
                  v-model.trim="form.items.lastName.value"
                  v-bind:formItem="form.items.lastName"
                  autocomplete="off"
                  rule="required|range {max: 40}"
                  dirty
                  touched
                />
              </td>
            </tr>
            <tr>
              <th>名前</th>
              <td>
                <form-input
                  id="firstName"
                  v-model.trim="form.items.firstName.value"
                  v-bind:formItem="form.items.firstName"
                  autocomplete="off"
                  rule="required|range {max: 40}"
                  dirty
                  touched
                />
              </td>
            </tr>
            <tr>
              <th>Email</th>
              <td>
                <form-input
                  id="email"
                  v-model.trim="form.items.email.value"
                  v-bind:formItem="form.items.email"
                  v-bind:maxlength="form.items.email.maxlength"
                  type="email"
                  autocomplete="off"
                  rule="required"
                  dirty
                  touched
                />
              </td>
            </tr>
            <tr>
              <th>Tel</th>
              <td>
                <form-input
                  id="tel"
                  v-model.trim="form.items.tel.value"
                  v-bind:formItem="form.items.tel"
                  autocomplete="off"
                  dirty
                  touched
                />
              </td>
            </tr>
            <tr>
              <th>パスワード</th>
              <td>
                <form-input
                  id="password"
                  v-model.trim="form.items.password.value"
                  v-bind:formItem="form.items.password"
                  type="password"
                  autocomplete="off"
                  dirty
                  touched
                />
              </td>
            </tr>
            <tr>
              <th>パスワード（確認用）</th>
              <td>
                <form-input
                  id="passwordConfirm"
                  v-model.trim="form.items.passwordConfirm.value"
                  v-bind:formItem="form.items.passwordConfirm"
                  type="password"
                  autocomplete="off"
                  dirty
                  touched
                />
              </td>
            </tr>
          </tbody>
        </table>
        <div class="field is-grouped is-grouped-centered">
          <button id="form-submit" class="button is-link" type="submit" :disabled="form.invalid" v-on:click.stop.prevent="create">登録</button>
        </div>
      </div>
    </div>
  </div>
  <sample-footer></sample-footer>
</div>
</template>

<script>
import _ from 'lodash';
import { staffApi } from '@/module/api';
import { apiHandleErr } from '@/module/errorHandler';
import BaseRegister from '@/view/base/Register';
import { StaffRegisterForm } from '@/forms';

export default {
  name: 'StaffRegister',
  mixins: [BaseRegister],

  data() {
    const form = new StaffRegisterForm();
    return {
      form,
    };
  },

  mounted() {
    console.log('start StaffRegister!');
  },

  methods: {
    callApi: data => staffApi.create(data),//OverRide
  },

  computed: {
    screenId: () => "STAFF_REGISTER", //OverRide
    namespace: () => "staff", //OverRide
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>