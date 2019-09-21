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
        :config="config"
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
import flatPickr from 'vue-flatpickr-component';
/* eslint-disable import/no-extraneous-dependencies, import/extensions */
import { Japanese } from 'flatpickr/dist/l10n/ja.js';
import formItemMixin from '@/mixins/form-item';
/* eslint-disable import/no-extraneous-dependencies */
import 'flatpickr/dist/flatpickr.min.css';

export default {
  mixins: [formItemMixin],
  inheritAttrs: false,

  data() {
    return {
      date: this.value,
      config: {
        locale: Japanese, // locale for this instance only
      },
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
