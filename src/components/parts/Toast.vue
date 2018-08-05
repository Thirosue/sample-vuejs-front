<template>
<div class="notification" :class="'is-' + info" :style="positionStyle">
  <button class="delete" v-on:click.stop.prevent="close"></button>
  <span v-html="content"></span>
</div>
</template>

<script>

const positionStyleMapping = [
  { "key": "top", "style": { top: '10px' } },
  { "key": "bottom", "style": { bottom: '10px' } },
]

export default {
  data:() => {
    return {
      info: 'info',
      position: 'top',
      content: null,
    }
  },
  beforeDestroy() {
    this.$el.remove()
  },
  methods: {
    close() { 
      this.$destroy()
    },
  },
  computed: {
    positionStyle() { return positionStyleMapping.find(style=>style.key === this.position).style },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div {
  right: 10px;
  text-align: right;
  align-items: flex-end;
  width: 100%;
  z-index: 99999;
  position: fixed;
  pointer-events: none;
  display: flex;
  flex-direction: column;
  padding: 25px;
  width: auto;
  opacity: 0.8;
  pointer-events: auto;
  display: inline-flex;
  padding: 1.25rem 1.5rem;
}
.fadeout {
  animation : fadeOut 1s;
  animation-fill-mode: both;
}
@keyframes fadeOut {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>