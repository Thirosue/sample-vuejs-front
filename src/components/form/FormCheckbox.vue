<template>
  <div class="field" v-bind:class="inputClassName">
    <label v-bind:for="id" class="label">{{ label }}</label>
    <div class="control">
      <input
        v-bind:type="type"
        v-bind:id="id"
        v-bind:name="nameAttr"
        v-bind="$attrs"
        v-bind:class="{
          'has-error': showError,
        }"
        v-on:input="handleInput"
        v-on:blur="handleBlur"
        :checked="value"
      >
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

export default {
  mixins: [formItemMixin],
  inheritAttrs: false,

  props: {
    type: {
      type: String,
      default: 'checkbox',
    },
  },

  methods: {
    handleInput(evt) {
      const trueValue = evt.target.getAttribute('true-value');
      const falseValue = evt.target.getAttribute('false-value');
      if (trueValue && falseValue) {
        this.$emit('input', evt.target.checked ? trueValue : falseValue);
      } else {
        this.$emit('input', evt.target.checked);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
