<template>
<div>
  <sample-navbar></sample-navbar>
  <section class="hero">
    <div class="hero-body">
      <div class="container">
        <h1 class="title">
          お問い合わせ
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
              <th>名前</th>
              <td>
                <form-input
                  id="name"
                  v-model.trim="form.items.name.value"
                  v-bind:formItem="form.items.name"
                  rule="required"
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
                  rule="required"
                  dirty
                  touched
                />
              </td>
            </tr>
            <tr>
              <th>カテゴリ</th>
              <td>
                <form-select
                  id="category"
                  v-model.trim="form.items.category.value"
                  v-bind:formItem="form.items.category"
                  rule="required"
                  touched
                />
              </td>
            </tr>
            <tr>
              <th>ジャンル</th>
              <td>
                <form-multi-checkbox
                  id="genre"
                  v-model.trim="form.items.genre.value"
                  v-bind:formItem="form.items.genre"
                />
              </td>
            </tr>
            <tr>
              <th>タイトル</th>
              <td>
                <form-input
                  id="title"
                  v-model.trim="form.items.title.value"
                  v-bind:formItem="form.items.title"
                />
              </td>
            </tr>
            <tr>
              <th>内容</th>
              <td>
                <form-textarea
                  id="body"
                  v-model.trim="form.items.body.value"
                  v-bind:formItem="form.items.body"
                  v-bind:rows="7"
                />
              </td>
            </tr>
          </tbody>
        </table>
        <!--
        <div class="field is-grouped is-grouped-centered">
          <button
            id="form-submit"
            class="button is-link"
            type="submit"
            v-on:click.stop.prevent="addChildren">子供追加</button>
        </div>
        <div class="field is-grouped is-grouped-centered">
          <button
            id="form-submit"
            class="button is-link"
            type="submit"
            v-on:click.stop.prevent="removeChildren">子供削除</button>
        </div>
        -->
        <div class="field is-grouped is-grouped-centered">
          <button
            id="form-submit"
            class="button is-link"
            type="submit"
            :disabled="form.invalid"
            v-on:click.stop.prevent="create">登録</button>
        </div>
      </div>
    </div>
  </div>
  <sample-footer></sample-footer>
</div>
</template>

<script>
import store from '@/store';
import ErrorHandler from '@/module/ErrorHandler';
import { InquiryUpdateForm } from '@/forms';
import { inquiryApi } from '@/module/Api';
import { COMMON_MESSAGE } from '@/conf/message';
import BaseRegister from '@/views/base/Register';

export default {
  mixins: [BaseRegister],

  data() {
    const { inquiryCategories } = store.state.master;
    const { inquiryGenre } = store.state.master;
    const { sex } = store.state.master;

    const form = new InquiryUpdateForm({}, inquiryCategories, inquiryGenre, sex);
    return {
      form,
    };
  },

  methods: {
    create() {
      console.log(this.form.notNullValues());
      inquiryApi.create(this.form.notNullValues())
        .then(() => this.$showModal(COMMON_MESSAGE.UPDATED, '', () => window.location.reload()))
        .catch(ErrorHandler.apiHandleErr);
    },
    addChildren() {
      this.form.addChildren();
    },
    removeChildren() {
      this.form.removeChildren();
    },
  },

  computed: {
    screenId: () => 'INQUIRY',
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
