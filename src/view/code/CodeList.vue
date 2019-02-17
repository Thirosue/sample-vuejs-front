<template>
<div>
  <sample-navbar></sample-navbar>
  <section class="hero">
    <div class="hero-body">
      <div class="container">
        <h1 class="title">
          コード一覧
        </h1>
      </div>
    </div>
  </section>
  <div class="container is-fullhd">
    <div class="notification">

      <form-select
        id="categoryKey"
        v-model.trim="form.items.categoryKey.value"
        v-bind:formItem="form.items.categoryKey"
        label="コード分類"
      />

      <form-input
        id="codeKey"
        v-model.trim="form.items.codeKey.value"
        v-bind:formItem="form.items.codeKey"
        label="コード値"
      />

      <form-input
        id="codeAlias"
        v-model.trim="form.items.codeAlias.value"
        v-bind:formItem="form.items.codeAlias"
        label="コードエイリアス"
      />

      <form-checkbox
        id="isInvalid"
        type="checkbox"
        v-model.trim="form.items.isInvalid.value"
        v-bind:formItem="form.items.isInvalid"
        label="無効フラグ"
        true-value="1"
        false-value="0"
      />

      <div class="field is-grouped is-grouped-right">
        <button id="form-submit" class="button is-link" type="submit" v-on:click.stop.prevent="search(1)">Search</button>
      </div>
    </div>

    <hr>

    <div class="sample-result-list" v-if="0 < results.length">
      <nav class="level">
        <!-- Left side -->
        <div class="level-left">
        </div>

        <!-- Right side -->
        <div class="level-right">
          <div class="control">
            <form-select
              id="sort"
              v-model.trim="form.items.sort.value"
              v-bind:formItem="form.items.sort"
              v-on:input="search(1)"
            />
          </div>
          <p class="level-item">
            <form-select
              id="rows"
              v-model.trim="form.items.rows.value"
              v-bind:formItem="form.items.rows"
              v-on:input="search(1)"
            />
          </p>
          <p class="level-item">
            <button class="button is-primary" type="submit" v-on:click.stop.prevent="downloadList">CSV Download</button>
          </p>
        </div>
      </nav>

      <sample-pager v-bind:initial-page="page" v-bind:page-count="totalPage" v-bind:click-handler="search" :resultCount="count"></sample-pager><!-- pager -->
      <hr>

      <table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
        <thead>
          <tr>
            <th>#</th>
            <th>ID</th>
            <th>コード分類キー</th>
            <th>コード分類名</th>
            <th>コードキー</th>
            <th>コード値</th>
            <th>コードエイリアス</th>
            <th>表示順</th>
            <th>無効フラグ</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(result, index) in results" v-bind:key="index">
            <td>{{index+1}}</td>
            <td><router-link v-bind:to="'/' + namespace + '/' + result.id">{{result.id}}</router-link></td>
            <td>{{result.categoryKey}}</td>
            <td>{{result.categoryName}}</td>
            <td>{{result.codeKey}}</td>
            <td>{{result.codeValue}}</td>
            <td>{{result.codeAlias}}</td>
            <td>{{result.displayOrder}}</td>
            <td>{{result.isInvalid}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <sample-footer></sample-footer>
</div>
</template>

<script>
/*
 * 検索結果を素直に記載するVersion
 */
import store from '@/store';
import is from 'is_js';
import { CodeSearchForm } from '@/forms';
import { codeApi } from '@/module/api';
import { convertKeys } from '@/helpers/form';
import csvHeader from '@/conf/csvHeader';
import ListSettings from '@/conf/ListSettings';
import BaseList from '@/view/base/List';

const CodeSortItems = [
  {value: 'categoryKey asc, displayOrder asc', text: 'コード分類キー 昇順'},
  {value: 'categoryKey desc, displayOrder asc', text: 'コード分類キー 降順'},
  {value: 'categoryName asc, displayOrder asc', text: 'コード分類名 昇順'},
  {value: 'categoryName desc, displayOrder asc', text: 'コード分類名 降順'},
];

export default {
  name: 'CodeList',
  mixins: [BaseList],
  
  data() {
    const codeCategories = store.state.master.codeCategories.map(val=>convertKeys(val, ['category_key', 'value'],  ['category_name', 'text'])); //APIの返戻を整形
    const form = new CodeSearchForm(this.$router.history.current.query, codeCategories , CodeSortItems); //dataオプションでは、mapGetters 利用不可
    return {
      form,
    };
  },

  methods: {
    callApi: where => codeApi.findAll(where), //<--- 個別に定義
  },

  computed: {
    screenId: () => "CODE_LIST", //<--- 個別に定義
    namespace: () => "code", //<--- 個別に定義
    fileProperties: () => ['code.csv', csvHeader.CODE_LIST], //<--- 個別に定義
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>