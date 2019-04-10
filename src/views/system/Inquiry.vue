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

  <div class="container is-fullhd mergin-bottom-10">
    <div class="container is-fullhd">
      <div class="sample-detail-area">
        <nav class="level">
          <!-- Left side -->
          <div class="level-left">
          </div>

          <!-- Right side -->
          <div class="level-right">
            <p class="level-item">
              <button
                id="form-submit"
                class="button is-link"
                type="submit"
                v-on:click.stop.prevent="addChildren">子供追加</button>
            </p>
            <p class="level-item">
              <button
                id="form-submit"
                class="button is-link"
                type="submit"
                v-on:click.stop.prevent="removeChildren">子供削除</button>
            </p>
          </div>
        </nav>
      </div>
    </div>
  </div>

  <div class="container is-fullhd mergin-bottom-30">
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
                  rule="required"
                  dirty
                  touched
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <div
    class="container is-fullhd mergin-bottom-10"
    v-for="(child, index) in form.children"
    :key="index"
  >
    <div class="container is-fullhd">
      <div class="sample-detail-area">
        <div class="field">
          <label class="label">{{index + 1}}人目のお子さま情報
          </label>
        </div>
        <table class="table is-striped is-narrow is-fullwidth" >
          <tbody>
            <tr>
              <th>名前</th>
              <td>
                <form-input
                  :id="`child_name_${index}`"
                  v-model="child.items.name.value"
                  v-bind:formItem="child.items.name"
                  rule="required"
                  dirty
                  touched
                />
              </td>
            </tr>
            <tr>
              <th>性別</th>
              <td>
                <form-radio
                  :id="`child_sex_${index}`"
                  v-model="child.items.sex.value"
                  v-bind:formItem="child.items.sex"
                  rule="required"
                  dirty
                  touched
                />
              </td>
            </tr>
            <tr>
              <th>誕生日</th>
              <td>
                <form-date-picker
                  :id="`child_birthDay_${index}`"
                  v-model="child.items.birthDay.value"
                  v-bind:formItem="child.items.birthDay"
                  touched
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <section class="hero">
    <div class="hero-body">
      <div class="container">
        <div class="field is-grouped is-grouped-centered">
          <button
            id="form-submit"
            class="button is-link"
            type="submit"
            :disabled="disabled"
            v-on:click.stop.prevent="create">登録</button>
        </div>
      </div>
    </div>
  </section>

  <sample-footer></sample-footer>
</div>
</template>

<script>
import store from '@/store';
import ErrorHandler from '@/module/ErrorHandler';
import { InquiryUpdateForm } from '@/forms';
import { inquiryApi } from '@/module/Api';
import { COMMON_MESSAGE } from '@/conf/message';
import { BaseUpdate, BaseRegister } from '@/views/base';

export default {
  mixins: [BaseUpdate, BaseRegister],

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
    async addChildren() {
      this.form.addChildren();
      this.$_.last(this.form.children).refreshState();
    },
    removeChildren() {
      this.form.removeChildren();
    },
  },

  computed: {
    screenId: () => 'INQUIRY',
    disabled() {
      return this.form.invalid
                || this.form.children.some(child => child.invalid)
                || this.processing;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.mergin-bottom-10 {margin-bottom: 10px;}
.mergin-bottom-30 {margin-bottom: 30px;}
</style>
