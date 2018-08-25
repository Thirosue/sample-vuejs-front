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

      <div class="field">
        <label class="label">コード分類</label>
        <div class="control">
          <sample-code-cagegory v-model="where.categoryKey"></sample-code-cagegory>
        </div>
      </div>

      <div class="field">
        <label class="label">コード値</label>
        <div class="control">
          <input class="input" id="codeKey" type="text" v-model="where.codeKey" v-on:keyup.enter="init">
        </div>
      </div>

      <div class="field">
        <label class="label">コードエイリアス</label>
        <div class="control">
          <input class="input" id="codeAlias" type="text" v-model="where.codeAlias" v-on:keyup.enter="init">
        </div>
      </div>

      <div class="checkbox">
        <label class="label">無効フラグ</label>
        <div class="control">
          <input id="isInvalid" type="checkbox" v-model="where.isInvalid" v-on:keyup.enter="init">
        </div>
      </div>

      <div class="field is-grouped is-grouped-right">
        <button id="form-submit" class="button is-link" type="submit" v-on:click.stop.prevent="init">Search</button>
      </div>
    </div>

    <hr>

    <div class="sample-result-list" v-if="totalPage">
      <nav class="level" v-if="totalPage">
        <!-- Left side -->
        <div class="level-left">
        </div>

        <!-- Right side -->
        <div class="level-right">
          <p class="level-item">
            <sample-view-count v-bind:value="where.rows||defaultRows" v-on:input="where.rows=$event, search(1,$event)"></sample-view-count>
          </p>
          <p class="level-item">
            <button class="button is-primary" type="submit" v-on:click.stop.prevent="downloadList">CSV Download</button>
          </p>
        </div>
      </nav>

      <sample-searching v-bind:searching="searching" v-bind:noresult="noResult"></sample-searching> <!-- searching -->
      <sample-pager v-if="existsResult" v-bind:initial-page="page" v-bind:page-count="totalPage" v-bind:click-handler="search" :resultCount="count"></sample-pager><!-- pager -->

      <hr>

      <table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth" v-show="existsResult">
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
            <td><router-link v-bind:to="'/' + namespace +  result.id">{{result.id}}</router-link></td>
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
import store from '@/store'
import fileHeader from '@/conf/fileHeader'
import SystemParameter from '@/module/dto/SystemParameter'
import BaseList from '@/components/controller/base/List'
import SingleSelectBox from '@/components/parts/form/mixin/SingleSelectBox'

const CodeQuery = {
  categoryKey: null,
  codeKey: null,
  codeAlias: null,
  isInvalid: false,
}

const codeCategory = {
	mixins: [SingleSelectBox],
  computed: {
    targetList() { return store.state.master.codeCategory.map(row=>({
        key: row.category_key,
        value: row.category_name
      }))
    },
  },
}

export default {
  name: 'CodeList',
  mixins: [BaseList],
	components: {
		'sample-code-cagegory': codeCategory
	},
  data: () => {
    return {
      where: Object.assign({}, SystemParameter, CodeQuery),
    }
  },
  mounted() {
    console.log('start CodeList!')
  },
  methods: {
  },
  computed: {
    screenId: () => "CODE_LIST",
    store() { return this.$store.state.code }, //OverRide
    fileProperties: () => ['code.csv', fileHeader.CODE_LIST], //OverRIde
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>