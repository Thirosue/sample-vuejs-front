<template>
<div>
  <sample-navbar></sample-navbar>
  <section class="hero">
    <div class="hero-body">
      <div class="container">
        <h1 class="title">
          コード編集
        </h1>
      </div>
    </div>
  </section>
  <div class="container is-fullhd">
    <div class="container is-fullhd">
      <div class="sample-detail-area">
        <table class="table  is-bordered is-striped is-narrow is-fullwidth" >
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
              <td>
                <sample-input :hasLabel="false" id="codeValue" v-model="editData.codeValue" type="text" label="コード値" name="codeValue"
                    v-on:error="setError('codeValue', $event)" :max="100" :required="true" :func="update" />
              </td>
            </tr>
            <tr>
              <th>コードエイリアス</th>
              <td>
                <sample-input :hasLabel="false" id="codeAlias" v-model="editData.codeAlias" type="text" label="コードエイリアス" name="codeAlias"
                    v-on:error="setError('codeAlias', $event)" :max="100" :required="false" :func="update" />
              </td>
            </tr>
            <tr>
              <th>属性1</th>
              <td>
                <sample-input :hasLabel="false" id="attribute1" v-model="editData.attribute1" type="text" label="属性1" name="attribute1"
                    v-on:error="setError('attribute1', $event)" :max="2" :required="false" :func="update" />
              </td>
            </tr>
            <tr>
              <th>属性2</th>
              <td>
                <sample-input :hasLabel="false" id="attribute2" v-model="editData.attribute2" type="text" label="属性2" name="attribute2"
                    v-on:error="setError('attribute2', $event)" :max="2" :required="false" :func="update" />
              </td>
            </tr>
            <tr>
              <th>属性3</th>
              <td>
                <sample-input :hasLabel="false" id="attribute3" v-model="editData.attribute3" type="text" label="属性3" name="attribute3"
                    v-on:error="setError('attribute3', $event)" :max="2" :required="false" :func="update" />
              </td>
            </tr>
            <tr>
              <th>属性4</th>
              <td>
                <sample-input :hasLabel="false" id="attribute4" v-model="editData.attribute4" type="text" label="属性4" name="attribute4"
                    v-on:error="setError('attribute4', $event)" :max="2" :required="false" :func="update" />
              </td>
            </tr>
            <tr>
              <th>属性5</th>
              <td>
                <sample-input :hasLabel="false" id="attribute5" v-model="editData.attribute5" type="text" label="属性5" name="attribute5"
                    v-on:error="setError('attribute5', $event)" :max="2" :required="false" :func="update" />
              </td>
            </tr>
            <tr>
              <th>属性6</th>
              <td>
                <sample-input :hasLabel="false" id="attribute6" v-model="editData.attribute6" type="text" label="属性6" name="attribute6"
                    v-on:error="setError('attribute6', $event)" :max="2" :required="false" :func="update" />
              </td>
            </tr>
            <tr>
              <th>表示順</th>
              <td>
                <sample-input :hasLabel="false" id="displayOrder" v-model="editData.displayOrder" type="text" label="表示順" name="displayOrder"
                    v-on:error="setError('displayOrder', $event)" :required="true" :numeric="true" :func="update" />
              </td>
            </tr>
            <tr>
              <th>無効フラグ</th>
              <td><input type="checkbox" v-model="editData.isInvalid"></td>
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
import BaseEdit from '@/view/base/Edit'
import BaseValidate from '@/view/base/Validate'
import ViewSettings from '@/conf/ViewSettings'

export default {
  name: 'CodeEdit',
  mixins: [BaseEdit,BaseValidate],
  data: () => {
    return {
      editData: {},
    }
  },
  mounted() {
    console.log('start CodeEdit!')
    this.editData = Object.assign({}, this.data)
  },
  methods: {
    async update() {
      if(this.hasError) return 

      this.doUpdate(this.editData)
    },
  },
  computed: {
    sreenId: () => "CODE_EDIT", //OverRide
    store() { return this.$store.state.code }, //OverRide
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>