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
          <input class="input" id="id" type="text" v-model="where.firstName" v-on:keyup.enter="init">
        </div>
      </div>

      <div class="field">
        <label class="label">苗字</label>
        <div class="control">
          <input class="input" id="password" type="text" v-model="where.lastName" v-on:keyup.enter="init">
        </div>
      </div>

      <div class="field">
        <label class="label">Email</label>
        <div class="control">
          <input class="input" id="password" type="text" v-model="where.email" v-on:keyup.enter="init">
        </div>
      </div>

      <div class="field">
        <label class="label">Tell</label>
        <div class="control">
          <input class="input" id="password" type="text" v-model="where.tel" v-on:keyup.enter="init">
        </div>
      </div>

      <div class="field is-grouped is-grouped-right">
        <button id="form-submit" class="button is-link" type="submit" v-on:click.stop.prevent="init">Search</button>
      </div>
    </div>

    <hr>

    <div class="sample-result-list">
      <sample-searching v-bind:searching="searching" v-bind:noresult="noResult"></sample-searching> <!-- searching -->
      <table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth" v-show="existsResult">
        <thead>
          <tr>
            <th>#</th>
            <th>名前</th>
            <th>苗字</th>
            <th>Email</th>
            <th>Tel</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(result, index) in results" v-bind:key="index">
            <th><router-link v-bind:to="'/staff/' + result.id">{{result.id}}</router-link></th>
            <td>{{result.firstName}}</td>
            <td>{{result.lastName}}</td>
            <td>{{result.email}}</td>
            <td>{{result.tel}}</td>
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
      where: Object.assign(SystemParameter, StaffQuery),
    }
  },
  mounted() {
    console.log('start StaffList!')
  },
  methods: {
  },
  computed: {
    store() { return this.$store.state.staff }, //OverRide
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>