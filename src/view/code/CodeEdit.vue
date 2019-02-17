<template>
<div>
  <sample-navbar></sample-navbar>
  <section class="hero">
    <div class="hero-body">
      <div class="container">
        <h1 class="title">
          コード編集
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
              <th>ID</th>
              <td>{{form.items.id.value}}</td>
            </tr>
            <tr>
              <th>コード分類キー</th>
              <td>{{form.items.categoryKey.value}}</td>
            </tr>
            <tr>
              <th>コード分類名</th>
              <td>{{form.items.categoryName.value}}</td>
            </tr>
            <tr>
              <th>コードキー</th>
              <td>{{form.items.codeKey.value}}</td>
            </tr>
            <tr>
              <th>コード値</th>
              <td>
                <form-input
                  id="codeValue"
                  v-model.trim="form.items.codeValue.value"
                  v-bind:formItem="form.items.codeValue"
                  v-bind:maxlength="form.items.codeValue.maxlength"
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
                  v-bind:maxlength="form.items.codeAlias.maxlength"
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
                  v-bind:maxlength="form.items.attribute1.maxlength"
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
                  v-bind:maxlength="form.items.attribute2.maxlength"
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
                  v-bind:maxlength="form.items.attribute3.maxlength"
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
                  v-bind:maxlength="form.items.attribute4.maxlength"
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
                  v-bind:maxlength="form.items.attribute5.maxlength"
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
                  v-bind:maxlength="form.items.attribute6.maxlength"
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
          <button id="form-submit" class="button is-link" type="submit" :disabled="form.invalid" v-on:click.stop.prevent="update">更新</button>
        </div>
      </div>
    </div>
  </div>
  <sample-footer></sample-footer>
</div>
</template>

<script>
import _ from 'lodash';
import { codeApi } from '@/module/api';
import { apiHandleErr } from '@/module/errorHandler';
import BaseEdit from '@/view/base/Edit';
import { CodeUpdateForm } from '@/forms';

export default {
  name: 'StaffEdit',
  mixins: [BaseEdit],

  data() {
    const form = new CodeUpdateForm();
    return {
      form,
    };
  },

  mounted() {
    console.log('start CodeEdit!')
  },

  methods: {
    callUpdate: data => codeApi.update(data),//OverRide
    async initForm(id) {
      const response = await codeApi.findById(id).catch(apiHandleErr);
      this.form = new CodeUpdateForm(_.head(response.data));
    },
  },

  computed: {
    sreenId: () => "CODE_EDIT", //OverRide
    namespace: () => "code", //OverRide
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>