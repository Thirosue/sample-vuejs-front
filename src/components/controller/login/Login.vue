<template>
<div>
  <section class="hero">
    <div class="hero-body">
      <div class="container">
        <h1 class="title">
          Login Form
        </h1>
      </div>
    </div>
  </section>
  <div class="container is-fullhd">
    <div class="notification">

      <sample-input id="id" type="email" label="Email" name="email" v-model="email" :hasLabel="true"
        :required="true" v-on:error="errorFlg = $event" placeholder="e.g. alexsmith@gmail.com" :func="signin" />

      <sample-input id="password" type="password" label="Password" name="password" v-model="password" :hasLabel="true"
          :required="true" v-on:error="errorFlg = $event" :func="signin" />

      <div v-if="errMsg" class="notification is-danger">
        {{errMsg}}
      </div>
      
      <div class="field is-grouped is-grouped-centered">
        <button id="form-submit" class="button is-link" type="submit" v-disable="!errorFlg" v-on:click.stop.prevent="signin">Login</button>
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
      email: '',
      password: '',
      errMsg: null,
      errorFlg: false,
    }
  },
  created() {
    if(this.$store.state.session.logouted) {
      alert('ログアウトしました')
      this.$store.dispatch('session/' + Type.UNSET_ALL)
    }
  },
  methods: {
    signin() {
      if(!this.errorFlg) return 
      this.errMsg = null
      this.$store.dispatch('session/login', { email: this.email, password: this.password })
                    .then(()=>this.$router.push('/'))
                    .catch(error => {
                      if(error.response.status===401) {
                        this.errMsg = message.ERR_AUTH
                      } else {
                        handler.apiHandleErr(error)
                      }
                    })
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>