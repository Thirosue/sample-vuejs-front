<template>
<div>
  <sample-navbar></sample-navbar>
  <section class="hero">
    <div class="hero-body">
      <div class="container">
        <h1 class="title">
          問い合わせ一覧（複数選択セレクトボックスVer）
        </h1>
      </div>
    </div>
  </section>
  <div class="container is-fullhd">
    <div class="notification">

      <form-multi-select
        id="genre"
        v-model.trim="form.items.genre.value"
        v-bind:formItem="form.items.genre"
        label="ジャンル"
        v-bind:size="5"
      />

      <div class="field is-grouped is-grouped-right">
        <button
          id="form-submit"
          class="button is-link"
          type="submit"
          v-on:click.stop.prevent="search(1)">Search</button>
      </div>
    </div>

    <hr>

    <list-results :results="results">
      <div class="sample-result-list" v-if="0 < results.length">
        <nav class="level">
          <!-- Left side -->
          <div class="level-left">
          </div>

          <!-- Right side -->
          <div class="level-right">
            <p class="level-item">
              <form-select
                id="rows"
                v-model.trim="form.items.rows.value"
                v-bind:formItem="form.items.rows"
                v-on:input="search(1)"
              />
            </p>
          </div>
        </nav>

        <pager
          :initial-page="page"
          :page-count="totalPage"
          :click-handler="search"
          :resultCount="count"></pager><!-- pager -->
        <hr>

        <table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
          <thead>
            <tr>
              <th>#</th>
              <th>タイトル</th>
              <th>カテゴリ</th>
              <th>ジャンル</th>
              <th>名前</th>
              <th>Email</th>
              <th>内容</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(result, index) in results" v-bind:key="index">
              <td>{{index+1}}</td>
              <td>{{result.title}}</td>
              <td>{{ displayCategory(result.category) }}</td>
              <td>{{ displayGenre(result.genre) }}</td>
              <td>{{result.name}}</td>
              <td>{{result.email}}</td>
              <td>{{result.body}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </list-results>
  </div>
  <sample-footer></sample-footer>
</div>
</template>

<script>
import store from '@/store';
import { InquirySearchForm2 } from '@/forms';
import { inquiryApi } from '@/module/Api';
import { decode } from '@/helpers';
import { BaseList } from '@/views/base';

export default {
  name: 'InquriyList2',
  mixins: [BaseList],

  data() {
    const { inquiryCategories } = store.state.master;
    const { inquiryGenre } = store.state.master;

    const form = new InquirySearchForm2(
      this.$router.history.current.query,
      inquiryCategories,
      inquiryGenre,
    );
    return {
      form,
    };
  },

  methods: {
    callApi: where => inquiryApi.findAll(where), // <--- 個別に定義
    displayCategory(category) {
      const { inquiryCategories } = store.state.master;
      return decode(category, inquiryCategories);
    },
    displayGenre(genreList) {
      if (!genreList) return '';
      const { inquiryGenre } = store.state.master;
      return this.$_.join(genreList.map(genre => decode(genre, inquiryGenre)), ', ');
    },
  },

  computed: {
    screenId: () => 'INQURITY_LIST2', // <--- 個別に定義
    namespace: () => 'inqurity', // <--- 個別に定義
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
