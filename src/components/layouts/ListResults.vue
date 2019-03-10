<template>
  <div>
    <searching :results="results"></searching>
    <slot></slot>
  </div>
</template>

<script>
import Searching from '@/components/Searching.vue';

export default {
  components: {
    Searching,
  },
  props: {
    results: {
      type: Array,
      required: true,
    },
  },
};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
