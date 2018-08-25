<template>
<div>
  <sample-navbar></sample-navbar>
  <section class="hero">
    <div class="hero-body">
      <div class="container">
        <h1 class="title">
          コード登録
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
              <th>コード分類キー</th>
              <td>
                <sample-code-cagegory :required="true" v-model="editData.codeCategoryId"></sample-code-cagegory>
              </td>
            </tr>
            <tr>
              <th>コードキー</th>
              <td>
                <sample-input :hasLabel="false" id="codeKey" v-model="editData.codeKey" type="text" label="コードキー" name="codeKey"
                    v-on:error="setError('codeKey', $event)" :max="50" :required="true" />
              </td>
            </tr>
            <tr>
              <th>コード値</th>
              <td>
                <sample-input :hasLabel="false" id="codeValue" v-model="editData.codeValue" type="text" label="コード値" name="codeValue"
                    v-on:error="setError('codeValue', $event)" :max="100" :required="true" />
              </td>
            </tr>
            <tr>
              <th>コードエイリアス</th>
              <td>
                <sample-input :hasLabel="false" id="codeAlias" v-model="editData.codeAlias" type="text" label="コードエイリアス" name="codeAlias"
                    v-on:error="setError('codeAlias', $event)" :max="100" :required="false" />
              </td>
            </tr>
            <tr>
              <th>属性1</th>
              <td>
                <sample-input :hasLabel="false" id="attribute1" v-model="editData.attribute1" type="text" label="属性1" name="attribute1"
                    v-on:error="setError('attribute1', $event)" :max="2" :required="false" />
              </td>
            </tr>
            <tr>
              <th>属性2</th>
              <td>
                <sample-input :hasLabel="false" id="attribute2" v-model="editData.attribute2" type="text" label="属性2" name="attribute2"
                    v-on:error="setError('attribute2', $event)" :max="2" :required="false" />
              </td>
            </tr>
            <tr>
              <th>属性3</th>
              <td>
                <sample-input :hasLabel="false" id="attribute3" v-model="editData.attribute3" type="text" label="属性3" name="attribute3"
                    v-on:error="setError('attribute3', $event)" :max="2" :required="false" />
              </td>
            </tr>
            <tr>
              <th>属性4</th>
              <td>
                <sample-input :hasLabel="false" id="attribute4" v-model="editData.attribute4" type="text" label="属性4" name="attribute4"
                    v-on:error="setError('attribute4', $event)" :max="2" :required="false" />
              </td>
            </tr>
            <tr>
              <th>属性5</th>
              <td>
                <sample-input :hasLabel="false" id="attribute5" v-model="editData.attribute5" type="text" label="属性5" name="attribute5"
                    v-on:error="setError('attribute5', $event)" :max="2" :required="false" />
              </td>
            </tr>
            <tr>
              <th>属性6</th>
              <td>
                <sample-input :hasLabel="false" id="attribute6" v-model="editData.attribute6" type="text" label="属性6" name="attribute6"
                    v-on:error="setError('attribute6', $event)" :max="2" :required="false" />
              </td>
            </tr>
            <tr>
              <th>表示順</th>
              <td>
                <sample-input :hasLabel="false" id="displayOrder" v-model="editData.displayOrder" type="text" label="表示順" name="displayOrder"
                    v-on:error="setError('displayOrder', $event)" :required="true" :numeric="true" />
              </td>
            </tr>
            <tr>
              <th>無効フラグ</th>
              <td><input type="checkbox" v-model="editData.isInvalid"></td>
            </tr>
          </tbody>
        </table>
        <div class="field is-grouped is-grouped-centered">
          <button id="form-submit" class="button is-link" type="submit" v-disabled="submitTrigger" v-on:click.stop.prevent="create">登録</button>
        </div>
      </div>
    </div>
  </div>
  <sample-footer></sample-footer>
</div>
</template>

<script>
import store from '@/store'
import BaseRegister from '@/components/controller/base/Register'
import BaseValidate from '@/components/controller/base/Validate'
import ViewSettings from '@/conf/ViewSettings'
import Message from '@/conf/message'
import SingleSelectBox from '@/components/parts/form/mixin/SingleSelectBox'

const codeCategory = {
	mixins: [SingleSelectBox],
  computed: {
    targetList() { return store.state.master.codeCategory.map(row=>({
        key: row.id,
        value: row.category_name
      }))
    },
  },
}

export default {
  name: 'StaffRegister',
  mixins: [BaseRegister,BaseValidate],
	components: {
		'sample-code-cagegory': codeCategory
  },
  directives: {
    disabled: {
      deep: true,
      bind: (el, binding, vnode) => {
        el.disabled = true
        el.style.opacity = 0.5 //TODO disableが有効にならないための暫定対応
      },
      update: (el, binding, vnode) => {
        el.style.opacity = null
        if(binding.value.existsEmptyNode() || binding.value.hasError) {
          el.disabled = true
        } else {
          el.disabled = false
        }
      }
    },
  },
  data: () => {
    return {
      editData: {
        codeCategoryId: 1,
        codeKey: null,
        codeValue: null,
        codeAlias: null,
        attribute1: null,
        attribute2: null,
        attribute3: null,
        attribute4: null,
        attribute5: null,
        attribute6: null,
        displayOrder: null,
        isInvalid: false,
      }
    }
  },
  mounted() {
    console.log('start StaffRegister!')
  },
  methods: {
    async create() {
      if(this.existsEmptyNode() || this.hasError) return 

      this.doRegist(this.editData)
    },
  },
  computed: {
    screenId: () => "CODE_REGISTER", //OverRide
    store() { return this.$store.state.code }, //OverRide
    submitTrigger() {
      return {
        existsEmptyNode: this.existsEmptyNode,
        hasError: this.hasError
      }
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>