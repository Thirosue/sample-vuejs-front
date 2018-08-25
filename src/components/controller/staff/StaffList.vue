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

      <div class="field">
        <label class="label">名前</label>
        <div class="control">
          <input class="input" id="firstName" type="text" v-model="where.firstName" v-on:keyup.enter="init">
        </div>
      </div>

      <div class="field">
        <label class="label">苗字</label>
        <div class="control">
          <input class="input" id="lastName" type="text" v-model="where.lastName" v-on:keyup.enter="init">
        </div>
      </div>

      <div class="field">
        <label class="label">Email</label>
        <div class="control">
          <input class="input" id="email" type="text" v-model="where.email" v-on:keyup.enter="init">
        </div>
      </div>

      <div class="field">
        <label class="label">Tell</label>
        <div class="control">
          <input class="input" id="tel" type="text" v-model="where.tel" v-on:keyup.enter="init">
        </div>
      </div>

      <div class="field is-grouped is-grouped-right">
        <button id="form-submit" class="button is-link" type="submit" v-on:click.stop.prevent="init">Search</button>
      </div>
    </div>

    <hr>

    <div class="sample-result-list" v-if="totalPage">
      <nav class="level">
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
            <th v-for="(label, i) in labels" v-bind:key="i">{{label}}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(result, rownum) in results" v-bind:key="rownum">
            <td>{{rownum+1}}</td>
            <td v-for="(key, j) in resultKeys" v-bind:key="j">
              <router-link v-if="key==='id'" v-bind:to="'/' + namespace +  result.id">{{result.id}}</router-link>
              <template v-else>{{result[key]}}</template>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <sample-footer></sample-footer>
</div>
</template>

<script>
import fileHeader from '@/conf/fileHeader'
import SystemParameter from '@/module/dto/SystemParameter'
import BaseList from '@/components/controller/base/List'
import ListSettings from '@/conf/ListSettings'

const StaffQuery = {
  firstName: null,
  lastName: null,
  email: null,
  tel: null,
}

export default {
  name: 'StaffList',
  mixins: [BaseList],
  data: () => {
    return {
      where: Object.assign({}, SystemParameter, StaffQuery),
    }
  },
  mounted() {
    console.log('start StaffList!')
  },
  methods: {
  },
  computed: {
    screenId: () => "STAFF_LIST",
    store() { return this.$store.state.staff }, //OverRide
    columSetting() { return ListSettings.Staff }, //OverRide
    fileProperties: () => ['staff.csv', fileHeader.STAFF_LIST], //OverRIde
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>