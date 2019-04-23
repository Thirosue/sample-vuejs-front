<template>
  <div>
    <template v-if="error">
      <section class="hero">
        <div class="hero-body">
          <div class="container">
            <h1 class="title">
              システムエラー
            </h1>
          </div>
        </div>
      </section>
      <div class="container is-fullhd">
        <article class="message is-danger" v-if="isShow">
          <div class="message-body">
            <p>
              エラーメッセージ；{{error.message}}
            </p>
            <p>
              エラー情報；{{info}}
            </p>
            <p>
              エラー詳細；{{error.stack}}
            </p>
          </div>
        </article>
        <a href="#" v-if="isLogin" @click="goHome">Homeへ</a>
        <a href="#" v-else @click="goLogin">ログインページへ</a>
      </div>
      <sample-footer></sample-footer>
    </template>
    <template v-else>
      <slot/>
    </template>
  </div>
</template>

<script>
import store from '@/store';
import router from '@/router';
import ErrorTracking from '@/module/ErrorTracking';

export default {
  name: 'ErrorBoundary',
  data() {
    return {
      error: null,
      info: null,
    };
  },
  errorCaptured(err, vm, info) {
    ErrorTracking.captureException(err);
    ErrorTracking.showReportDialog();
    this.error = err;
    this.info = info;
  },
  methods: {
    goHome() {
      this.error = null;
      this.info = null;
      router.push('/');
    },
    goLogin() {
      this.error = null;
      this.info = null;
      router.push('/login');
    },
  },
  computed: {
    isShow() {
      return store.state.mode !== 'production';
    },
    isLogin() {
      return store.state.session !== null
                && store.state.session.values !== null
                && store.state.session.values.cookie !== null;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
