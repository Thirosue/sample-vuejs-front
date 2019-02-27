<template>
<div class="modal is-active">
  <div class="modal-background" v-on:click.stop.prevent="close"></div>
  <div class="modal-card">
    <header class="modal-card-head" v-if="title">
      <p class="modal-card-title">{{title}}</p>
      <button class="delete" aria-label="close" v-on:click.stop.prevent="close"></button>
    </header>
    <section class="modal-card-body">
      <span v-html="content"></span>
    </section>
    <footer class="modal-card-foot" v-if="bottomVisible">
      <button class="button is-success" v-on:click.stop.prevent="modalSubmit">OK</button>
      <button v-if="!blankCancelCallBack" class="button" v-on:click.stop.prevent="modalCancel">Cancel</button>
    </footer>
  </div>
</div>
</template>

<script>
export default {
  data: () => ({
    title: null,
    content: null,
    submitCallBack: () => {},
    cancelCallBack: () => {},
    bottomVisible: true,
  }),
  beforeDestroy() {
    this.$el.remove();
  },
  methods: {
    modalSubmit() {
      this.submitCallBack();
      this.close();
    },
    modalCancel() {
      this.cancelCallBack();
      this.close();
    },
    close() {
      this.$el.classList.remove('is-active');
      this.$destroy();
    },
  },
  computed: {
    blankCancelCallBack() { return (this.cancelCallBack.toString().indexOf('{') + 1) === this.cancelCallBack.toString().indexOf('}'); },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
