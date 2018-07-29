<template>
<div>
  <sample-navbar></sample-navbar>
  <section class="hero">
    <div class="hero-body">
      <div class="container">
        <h1 class="title">
          担当者登録
        </h1>
      </div>
    </div>
  </section>
  <div class="container is-fullhd">
    <div class="container is-fullhd">
      <div class="sample-detail-area">
        <table class="table is-bordered is-striped is-narrow is-fullwidth" >
          <tbody>
            <tr v-for="(result, index) in columns" v-bind:key="index" v-if="result.type!=='ignore'">
              <th>{{result.key | decode}}</th>
              <td>
                <div class="control">
                  <sample-input :hasLabel="false" :id="result.key" :type="getType(result.type)" :label="result.key | decode" :name="result.key"
                    v-on:error="setError(result.key, $event)" :min="result.min" :max="result.max" :required="result.required" />
                </div>
              </td>
            </tr>
            <tr>
              <th>パスワード</th>
              <td>
                <sample-input id="password" type="password" label="パスワード" name="password" :hasLabel="false"
                    :required="true" v-on:error="setError('password', $event)" />
              </td>
            </tr>
            <tr>
              <th>パスワード（確認用）</th>
              <td>
                <sample-input id="password2" type="password" label="パスワード（確認用）" name="password2" :hasLabel="false"
                    :required="true" v-on:error="setError('password2', $event)" />
              </td>
            </tr>
          </tbody>
        </table>
        <div class="field is-grouped is-grouped-centered">
          <button id="form-submit" class="button is-link" type="submit" v-disable="checkError()" v-on:click.stop.prevent="create">登録</button>
        </div>
      </div>
    </div>
  </div>
  <sample-footer></sample-footer>
</div>
</template>

<script>
import BaseRegister from '@/components/controller/base/Register'
import BaseValidate from '@/components/controller/base/Validate'
import ViewSettings from '@/conf/ViewSettings'

export default {
  name: 'StaffRegister',
  mixins: [BaseRegister,BaseValidate],
  mounted() {
    console.log('start StaffRegister!')
  },
  methods: {
    customizeData(modifiedData) {
      modifiedData['password'] = document.querySelector("[data-key='password']").value
    },
  },
  computed: {
    store() { return this.$store.state.staff }, //OverRide
    columSetting() { return ViewSettings.Staff }, //OverRide
  },
  filters: {
    decode: (key) => ViewSettings.decode(key, ViewSettings.Staff)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>