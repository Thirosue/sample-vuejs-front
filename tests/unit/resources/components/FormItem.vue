<template>
  <div>
    <input
      v-bind:value="value"
      type="text" 
      v-on:input="handleInput"
      v-on:blur="handleBlur"
    >
  </div>
</template>

<script>
import formItemMixin from '@/mixins/form-item';

export default {
  mixins: [formItemMixin],
};
</script>
