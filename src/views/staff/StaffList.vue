<template>
<div>
  <sample-navbar></sample-navbar>
  <section class="hero">
    <div class="hero-body">
      <div class="container">
        <h1 class="title">
          担当者一覧
        </h1>
      </div>
    </div>
  </section>
  <div class="container is-fullhd">
    <div class="notification">

      <form-input
        id="firstName"
        v-model.trim="form.items.firstName.value"
        v-bind:formItem="form.items.firstName"
        label="名前"
        v-bind:searchHandler="search"
      />

      <form-input
        id="lastName"
        v-model.trim="form.items.lastName.value"
        v-bind:formItem="form.items.lastName"
        label="苗字"
        v-bind:searchHandler="search"
      />

      <form-input
        id="email"
        v-model.trim="form.items.email.value"
        v-bind:formItem="form.items.email"
        label="Email"
        v-bind:searchHandler="search"
      />

      <form-input
        id="tel"
        v-model.trim="form.items.tel.value"
        v-bind:formItem="form.items.tel"
        label="Tell"
        v-bind:searchHandler="search"
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
              <button
                class="button is-primary"
                type="submit"
                v-on:click.stop.prevent="downloadList">CSV Download</button>
            </p>
          </div>
        </nav>

        <pager
          :initial-page="page"
          :page-count="totalPage"
          :click-handler="search"
          :resultCount="count"></pager><!-- pager -->
        <hr>

        <table
          id="result-list"
          class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth"
        >
          <thead>
            <tr>
              <th>#</th>
              <th v-for="(label, i) in labels" v-bind:key="i">{{label}}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(result, rownum) in results" v-bind:key="rownum">
              <td>{{rownum+1}}</td>
              <td v-for="(key, j) in resultKeys" v-bind:key="j">
                <router-link
                  v-if="key==='id'"
                  :to="'/' + namespace + '/' +  result.id">{{result.id}}</router-link>
                <template v-else>{{result[key]}}</template>
              </td>
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
/*
 * 検索結果を設定に持たせるVersion

const StaffListSettings = [
    {key: 'id', value: 'ID', order: 1, sort: false},
    {key: 'firstName', value: '名前', order: 2, sort: true},
    {key: 'lastName', value: '苗字', order: 3, sort: false},
    {key: 'email', value: 'Email', order: 4, sort: true},
    {key: 'tel', value: 'Tel', order: 5, sort: false},
  ]

 */
import { StaffSearchForm } from '@/forms';
import { staffApi } from '@/module/Api';
import csvHeader from '@/conf/csvHeader';
import ListSettings from '@/conf/ListSettings';
import { BaseList } from '@/views/base';

export default {
  name: 'StaffList',
  mixins: [BaseList],

  data() {
    const form = new StaffSearchForm(this.$router.history.current.query);
    return {
      form,
    };
  },

  methods: {
    callApi: where => staffApi.findAll(where), // <--- 個別に定義
  },

  computed: {
    screenId: () => 'STAFF_LIST', // <--- 個別に定義
    namespace: () => 'staff', // <--- 個別に定義
    fileProperties: () => ['staff.csv', csvHeader.STAFF_LIST], // <--- 個別に定義
    columSetting: () => ListSettings.StaffListSettings, // <--- 個別に定義
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
