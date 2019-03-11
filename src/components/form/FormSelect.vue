<template>
  <div class="field" v-bind:class="inputClassName">
    <label v-if="label" v-bind:for="id" class="label">{{ label }}</label>
    <div class="select">
      <select
        v-model="model"
        v-bind:id="id"
        v-bind:name="nameAttr"
        v-bind="$attrs"
        v-bind:class="{
          'has-error': showError
        }"
        v-on:input="handleInput"
        v-on:blur="handleBlur"
      >
        <option value="">選択してください</option>
        <option
          v-for="(option, index) in formItem.options"
          v-bind:key="`option-${index}`"
          v-bind:value="option.value"
        >{{ option.text }}</option>
      </select>
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
import { BaseSelectFormItem } from '@/lib';

export default {
  mixins: [formItemMixin],
  inheritAttrs: false,

  props: {
    formItem: {
      type: BaseSelectFormItem,
      required: true,
    },
  },

  computed: {
    model: {
      get() {
        return this.value;
      },
      set() {},
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
