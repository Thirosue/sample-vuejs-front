<template>
<div>
  <sample-navbar></sample-navbar>
  <section class="hero">
    <div class="hero-body">
      <div class="container">
        <h1 class="title">
          コード登録
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
              <th>コード分類キー</th>
              <td>
                <form-select
                  id="codeCategoryId"
                  v-model.trim="form.items.codeCategoryId.value"
                  v-bind:formItem="form.items.codeCategoryId"
                  rule="required"
                  touched
                />
              </td>
            </tr>
            <tr>
              <th>コードキー</th>
              <td>
                <form-input
                  id="codeKey"
                  v-model.trim="form.items.codeKey.value"
                  v-bind:formItem="form.items.codeKey"
                  rule="required|range {max: 50}"
                  dirty
                  touched
                />
              </td>
            </tr>
            <tr>
              <th>コード値</th>
              <td>
                <form-input
                  id="codeValue"
                  v-model.trim="form.items.codeValue.value"
                  v-bind:formItem="form.items.codeValue"
                  rule="required|range {max: 100}"
                  dirty
                  touched
                />
              </td>
            </tr>
            <tr>
              <th>コードエイリアス</th>
              <td>
                <form-input
                  id="codeAlias"
                  v-model.trim="form.items.codeAlias.value"
                  v-bind:formItem="form.items.codeAlias"
                  rule="range {max: 100}"
                  dirty
                  touched
                />
              </td>
            </tr>
            <tr>
              <th>属性1</th>
              <td>
                <form-input
                  id="attribute1"
                  v-model.trim="form.items.attribute1.value"
                  v-bind:formItem="form.items.attribute1"
                  rule="range {max: 2}"
                  dirty
                  touched
                />
              </td>
            </tr>
            <tr>
              <th>属性2</th>
              <td>
                <form-input
                  id="attribute2"
                  v-model.trim="form.items.attribute2.value"
                  v-bind:formItem="form.items.attribute2"
                  rule="range {max: 2}"
                  dirty
                  touched
                />
              </td>
            </tr>
            <tr>
              <th>属性3</th>
              <td>
                <form-input
                  id="attribute3"
                  v-model.trim="form.items.attribute3.value"
                  v-bind:formItem="form.items.attribute3"
                  rule="range {max: 2}"
                  dirty
                  touched
                />
              </td>
            </tr>
            <tr>
              <th>属性4</th>
              <td>
                <form-input
                  id="attribute4"
                  v-model.trim="form.items.attribute4.value"
                  v-bind:formItem="form.items.attribute4"
                  rule="range {max: 2}"
                  dirty
                  touched
                />
              </td>
            </tr>
            <tr>
              <th>属性5</th>
              <td>
                <form-input
                  id="attribute5"
                  v-model.trim="form.items.attribute5.value"
                  v-bind:formItem="form.items.attribute5"
                  rule="range {max: 2}"
                  dirty
                  touched
                />
              </td>
            </tr>
            <tr>
              <th>属性6</th>
              <td>
                <form-input
                  id="attribute6"
                  v-model.trim="form.items.attribute6.value"
                  v-bind:formItem="form.items.attribute6"
                  rule="range {max: 2}"
                  dirty
                  touched
                />
              </td>
            </tr>
            <tr>
              <th>表示順</th>
              <td>
                <form-input
                  id="displayOrder"
                  v-model.trim="form.items.displayOrder.value"
                  v-bind:formItem="form.items.displayOrder"
                  type="number"
                  dirty
                  touched
                />
              </td>
            </tr>
            <tr>
              <th>無効フラグ</th>
              <td>
                <form-checkbox
                  id="isInvalid"
                  v-model.trim="form.items.isInvalid.value"
                  v-bind:formItem="form.items.isInvalid"
                  type="checkbox"
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
import store from '@/store';
import _ from 'lodash';
import BaseRegister from '@/view/base/Register';
import { codeApi } from '@/module/api';
import { apiHandleErr } from '@/module/errorHandler';
import { convertKeys } from '@/helpers/form';
import { CodeUpdateForm } from '@/forms';

export default {
  name: 'CodeRegister',
  mixins: [BaseRegister],

  data() {
    const codeCategories = store.state.master.codeCategories.map(val=>convertKeys(val, ['id', 'value'],  ['category_name', 'text'])); //APIの返戻を整形
    const form = new CodeUpdateForm({}, codeCategories);
    return {
      form,
    };
  },

  mounted() {
    console.log('start CodeRegister!')
  },

  methods: {
    callApi: data => codeApi.create(data),//OverRide
  },

  computed: {
    screenId: () => "CODE_REGISTER", //OverRide
    namespace: () => "code", //OverRide
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>