<template>
  <div class="field">
    <label v-if="label" v-bind:for="id" class="label">{{ label }}</label>
    <div class="select">
      <select multiple
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
          :selected="isSelected(formItem.value, option.value)"
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
import { formItemMixin } from '@/mixins';
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

  methods: {
    isSelected(listValues, _thisValue) { return listValues.includes(_thisValue); },
    handleInput(evt) {
      const options = evt.target.querySelectorAll('option');
      const value = [...options]
                          .filter(option=>option.selected && this.$is.not.empty(option.value))
                          .map(option=>option.value);
      this.$emit('input', value);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>