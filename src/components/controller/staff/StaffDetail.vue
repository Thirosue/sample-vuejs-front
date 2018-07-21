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
          <router-link class="button is-link" type="submit" v-bind:to="'/staffEdit?id=' + data.id">編集</router-link>
        </div>
      </div>
    </section>
    <div class="container is-fullhd">
      <div class="sample-detail-area">
        <table class="table is-bordered is-striped is-narrow is-fullwidth">
          <tbody>
            <tr v-for="(result, index) in results()" v-bind:key="index" v-if="result.type!=='ignore'">
              <th>{{result.key}}</th>
              <td v-if="result.type!=='sercret'">{{result.value}}</td>
              <td v-if="result.type==='sercret'">**********</td>
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
import BaseDetail from '@/components/controller/base/Detail'
import ViewSettings from '@/conf/ViewSettings'

export default {
  name: 'StaffDetail',
  mixins: [BaseDetail],
  mounted() {
    console.log('start StaffDetail!')
  },
  methods: {
  },
  computed: {
    store() { return this.$store.state.staff }, //OverRide
    columSetting() { return ViewSettings.Staff }, //OverRide
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>