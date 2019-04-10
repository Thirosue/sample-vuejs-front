<template>
<div>
  <sample-navbar></sample-navbar>
  <section class="hero">
    <div class="hero-body">
      <div class="container">
        <h1 class="title">
          担当者編集
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
              <th>苗字</th>
              <td>
                <form-input
                  id="lastName"
                  v-model.trim="form.items.lastName.value"
                  v-bind:formItem="form.items.lastName"
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
                  rule="required"
                  type="email"
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
                  dirty
                  touched
                />
              </td>
            </tr>
          </tbody>
        </table>
        <div class="field is-grouped is-grouped-centered">
          <button
            id="form-submit"
            class="button is-link"
            type="submit"
            :disabled="disableAction"
            v-on:click.stop.prevent="update">更新</button>
        </div>
      </div>
    </div>
  </div>
  <sample-footer></sample-footer>
</div>
</template>

<script>
import { staffApi } from '@/module/Api';
import { BaseUpdate, BaseEdit } from '@/views/base';
import { StaffUpdateForm } from '@/forms';

export default {
  name: 'StaffEdit',
  mixins: [BaseUpdate, BaseEdit],

  data() {
    const form = new StaffUpdateForm();
    return {
      form,
    };
  },

  mounted() {
    console.log('start StaffEdit!');
  },

  methods: {
    callFindById: id => staffApi.findById(id), // OverRide
    callUpdate: data => staffApi.update(data), // OverRide
  },

  computed: {
    screenId: () => 'STAFF_EDIT', // OverRide
    namespace: () => 'staff', // OverRide
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
