<template>
<div>
  <sample-navbar></sample-navbar>
  <section class="hero">
    <div class="hero-body">
      <div class="container">
        <h1 class="title">
          パスワード変更
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
              <th>古いパスワード</th>
              <td>
                <sample-input id="oldPassword" type="password" label="古いパスワード" name="oldPassword" v-model="oldpassword" :hasLabel="false"
                    :required="true" v-on:error="errorFlg = $event" :func="changePassword" />
              </td>
            </tr>
            <tr>
              <th>新しいパスワード</th>
              <td>
                <sample-input id="newPassword" type="password" label="新しいパスワード" name="newPassword" v-model="newPassword" :hasLabel="false"
                    :required="true" v-on:error="errorFlg = $event" :func="changePassword" />
              </td>
            </tr>
            <tr>
              <th>新しいパスワード（確認用）</th>
              <td>
                <sample-input id="newPassword2" type="password" label="新しいパスワード（確認用）" name="newPassword2" v-model="newPassword2" :hasLabel="false"
                    :required="true" v-on:error="errorFlg = $event" :func="changePassword" />
              </td>
            </tr>
          </tbody>
        </table>
        <div class="field is-grouped is-grouped-centered">
          <button id="form-submit" class="button is-link" type="submit" v-disable="!errorFlg" v-on:click.stop.prevent="changePassword">更新</button>
        </div>
      </div>
    </div>
  </div>
  <sample-footer></sample-footer>
</div>
</template>

<script>
import handler from '@/module/errorHandler'
import message from '@/conf/message'
import Type from '@/store/mutation-types'

export default {
  data: () => {
    return {
      oldPassword: '',
      newPassword: '',
      newPassword2: '',
      errMsg: null,
      errorFlg: false,
    }
  },
  methods: {
    changePassword() {
      if(!this.errorFlg) return 
      //TODO
    },
  },
  computed: {
    screenId: () => "EDIT_PASSWORD",
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>