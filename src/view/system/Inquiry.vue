<template>
<div>
  <sample-navbar></sample-navbar>
  <section class="hero">
    <div class="hero-body">
      <div class="container">
        <h1 class="title">
          お問い合わせ
        </h1>
      </div>
    </div>
  </section>
  <div class="container is-fullhd">
    <div class="container is-fullhd">
      <div class="sample-detail-area">
      </div>
    </div>
  </div>
  <sample-footer></sample-footer>
</div>
</template>

<script>
import BaseUpdate from '@/view/base/Update';

export default {
  //mixins: [BaseUpdate],

  data() {
    return {
    };
  },

  methods: {

  },

  computed: {
    screenId: () => "INQUIRY",
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>