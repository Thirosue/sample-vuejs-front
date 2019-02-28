<template>
<div>
  <div>
    <sample-navbar></sample-navbar>
    <section class="hero">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            担当者詳細
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
            <tr v-for="(result, index) in results()" v-bind:key="index">
              <th>{{result.label}}</th>
              <td>{{result.value}}</td>
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
 * 表示を設定に持たせるVersion

const Staff = [
  {key: 'id', label: 'ID', orderBy: 1, ignore: true},
  {key: 'firstName', label: '名前', orderBy: 2},
  {key: 'lastName', label: '苗字', orderBy: 3},
  {key: 'email', label: 'Email', orderBy: 4},
  {key: 'tel', label: 'Tel', orderBy: 5},
  {key: 'password', label: 'パスワード', orderBy: 6, ignore: true},
  {key: 'version', label: '改訂番号', orderBy: 0, ignore: true},
]

 */
import { staffApi } from '@/module/Api';
import BaseDetail from '@/views/base/Detail';
import ViewSettings from '@/conf/ViewSettings';

export default {
  name: 'StaffDetail',
  mixins: [BaseDetail],
  mounted() {
    console.log('start StaffDetail!');
  },
  methods: {
    callApi: id => staffApi.findById(id), // <--- 個別に定義
  },
  computed: {
    screenId: () => 'STAFF_DETAIL',
    namespace: () => 'staff', // <--- 個別に定義
    columSetting() { return ViewSettings.Staff; }, // OverRide
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
