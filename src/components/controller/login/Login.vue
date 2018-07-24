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
      <div class="field">
        <label class="label">Email</label>
        <div class="control">
          <input class="input" id="id" type="email" v-model="email" placeholder="e.g. alexsmith@gmail.com" 
            name="email" data-vv-as="Email" v-validate="'email'"
            :class="{'has-error': errors.has('email')}" v-on:keyup.enter="signin" required>
        </div>
        <article v-if="errors.has('email')" class="message is-danger">
          <div class="message-body">
            {{ errors.first('email') }}
          </div>
        </article>
      </div>

      <div class="field">
        <label class="label">Password</label>
        <div class="control">
          <input class="input" id="password" type="password" v-model="password" v-on:keyup.enter="signin" required>
        </div>
      </div>

      <div v-if="errMsg" class="notification is-danger">
        {{errMsg}}
      </div>
      
      <div class="field is-grouped is-grouped-centered">
        <button id="form-submit" class="button is-link" type="submit" v-disable="disableLogin" v-on:click.stop.prevent="signin">Login</button>
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
  },
  computed: {
    disableLogin() {
      return 0 === this.email.length || 0 === this.password.length
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>