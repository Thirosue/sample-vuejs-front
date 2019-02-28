<template>
<div>
  <div>
    <sample-navbar></sample-navbar>
    <section class="hero">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            コード詳細
          </h1>
        </div>
        <div class="field is-grouped is-grouped-right">
          <a class="button is-link" type="submit" v-on:click="goEdit">編集</a>
        </div>
      </div>
    </section>
    <div class="container is-fullhd">
      <div class="sample-detail-area">
        <table class="table is-bordered is-striped is-narrow is-fullwidth">
          <tbody>
            <tr>
              <th>ID</th>
              <td>{{data.id}}</td>
            </tr>
            <tr>
              <th>コード分類キー</th>
              <td>{{data.categoryKey}}</td>
            </tr>
            <tr>
              <th>コード分類名</th>
              <td>{{data.categoryName}}</td>
            </tr>
            <tr>
              <th>コードキー</th>
              <td>{{data.codeKey}}</td>
            </tr>
            <tr>
              <th>コード値</th>
              <td>{{data.codeValue}}</td>
            </tr>
            <tr>
              <th>コードエイリアス</th>
              <td>{{data.codeAlias}}</td>
            </tr>
            <tr>
              <th>属性1</th>
              <td>{{data.attribute1}}</td>
            </tr>
            <tr>
              <th>属性2</th>
              <td>{{data.attribute2}}</td>
            </tr>
            <tr>
              <th>属性3</th>
              <td>{{data.attribute3}}</td>
            </tr>
            <tr>
              <th>属性4</th>
              <td>{{data.attribute4}}</td>
            </tr>
            <tr>
              <th>属性5</th>
              <td>{{data.attribute5}}</td>
            </tr>
            <tr>
              <th>属性6</th>
              <td>{{data.attribute6}}</td>
            </tr>
            <tr>
              <th>表示順</th>
              <td>{{data.displayOrder}}</td>
            </tr>
            <tr>
              <th>無効フラグ</th>
              <td><input type="checkbox" v-model="data.isInvalid" disabled></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <sample-footer></sample-footer>
</div>
</template>

<script>
/*
 * 検索結果を素直に記載するVersion
 */
import { codeApi } from '@/module/Api';
import BaseDetail from '@/views/base/Detail';

export default {
  name: 'CodeDetail',
  mixins: [BaseDetail],
  mounted() {
    console.log('start CodeDetail!');
  },
  methods: {
    callApi: id => codeApi.findById(id), // <--- 個別に定義
  },
  computed: {
    screenId: () => 'CODE_DETAIL',
    namespace: () => 'code', // <--- 個別に定義
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
