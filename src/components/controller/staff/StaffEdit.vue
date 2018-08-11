<template>
<div>
  <sample-navbar></sample-navbar>
  <section class="hero">
    <div class="hero-body">
      <div class="container">
        <h1 class="title">
          担当者編集
        </h1>
      </div>
    </div>
  </section>
  <div class="container is-fullhd">
    <div class="container is-fullhd">
      <div class="sample-detail-area">
        <table class="table  is-bordered is-striped is-narrow is-fullwidth" >
          <tbody>
            <tr v-for="(result, index) in results()" v-bind:key="index" v-if="result.type!=='ignore'">
              <th>{{result.key | decode}}</th>
              <td>
                <sample-input :hasLabel="false" :id="result.key" :value="result.value" :type="getType(result.type)" :label="result.key | decode" :name="result.key"
                    v-on:error="setError(result.key, $event)" :min="result.min" :max="result.max" :required="result.required" :numeric="result.numeric" :func="update" />
              </td>
            </tr>
          </tbody>
        </table>
        <div class="field is-grouped is-grouped-centered">
          <button id="form-submit" class="button is-link" type="submit" v-disable="hasError" v-on:click.stop.prevent="update">更新</button>
        </div>
      </div>
    </div>
  </div>
  <sample-footer></sample-footer>
</div>
</template>

<script>
import BaseEdit from '@/components/controller/base/Edit'
import BaseValidate from '@/components/controller/base/Validate'
import ViewSettings from '@/conf/ViewSettings'

export default {
  name: 'StaffEdit',
  mixins: [BaseEdit,BaseValidate],
  mounted() {
    console.log('start StaffEdit!')
  },
  computed: {
    getScreenId: () => "STAFF_EDIT", //OverRide
    store() { return this.$store.state.staff }, //OverRide
    columSetting() { return ViewSettings.Staff }, //OverRide
  },
  filters: {
    decode: (key) => ViewSettings.decode(key, ViewSettings.Staff)
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>