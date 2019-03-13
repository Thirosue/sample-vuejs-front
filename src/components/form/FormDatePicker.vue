<template>
  <div class="field" v-bind:class="inputClassName">
    <label v-if="label" v-bind:for="id" class="label">{{ label }}</label>
    <div class="control">
      <flat-pickr
        class="input"
        v-bind:id="id"
        v-model="date"
        v-bind:name="nameAttr"
        v-bind="$attrs"
        v-bind:class="{
          'has-error': showError,
        }"
        v-on:blur="handleBlur"
      >
      </flat-pickr>
    </div>
    <article v-show="showError" class="message is-danger">
      <div class="message-body">
        <ul>
          <li
            v-for="(message, index) in messages"
            v-bind:key="`message-${index}`"
          >{{ message }}</li>
        </ul>
      </div>
    </article>
  </div>
</template>

<script>
import formItemMixin from '@/mixins/form-item';
import flatPickr from 'vue-flatpickr-component';
/* eslint-disable import/no-extraneous-dependencies */
import 'flatpickr/dist/flatpickr.min.css';

export default {
  mixins: [formItemMixin],
  inheritAttrs: false,

  data() {
    return {
      date: this.value,
    };
  },
  components: {
    flatPickr,
  },

  watch: {
    date(value) {
      this.$emit('input', value);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
