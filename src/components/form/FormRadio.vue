<template>
  <div class="field" v-bind:class="inputClassName">
    <label v-bind:for="id" class="label">{{ label }}</label>
    <div class="control">
      <label
        class="radio"
        v-bind:id="id"
        v-bind:value="value"
        v-bind:name="nameAttr"
        v-bind="$attrs"
        v-bind:class="{
          'has-error': showError,
        }"
        v-on:input="handleInput"
        v-on:blur="handleBlur"
        v-for="(option, index) in formItem.options"
        v-bind:key="`option-${index}`"
      >
        <input
          type="radio"
          v-bind:name="id"
          v-bind:value="option.value"
          :checked="isChecked(value, option.value)"
        >
        {{ option.text }}
      </label>
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
      default: 'radio',
    },
  },

  methods: {
    isChecked(value, _this) { return value === _this; },
  },
};
</script>

<style lang="scss" scoped>
</style>
