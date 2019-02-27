<template>
  <div class="field">
    <label v-if="label" v-bind:for="id" class="label">{{ label }}</label>
    <div class="control">
      <input
        class="input"
        v-bind:type="type"
        v-bind:id="id"
        v-bind:value="value"
        v-bind:name="nameAttr"
        v-bind="$attrs"
        v-bind:class="{
          'has-error': showError,
        }"
        v-on:input="handleInput"
        v-on:blur="handleBlur"
        v-on:keyup.enter="onKeyUpHandler"
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
import { formItemMixin } from '@/mixins';

export default {
  mixins: [formItemMixin],
  inheritAttrs: false,

  props: {
    type: {
      type: String,
      default: 'text',
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
