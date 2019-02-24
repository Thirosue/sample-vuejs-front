<template>
  <div class="field">
    <label v-bind:for="id" class="label">{{ label }}</label>
    <div class="control">
      <template v-for="(option, index) in formItem.options">
        <label class="checkbox" v-bind:for="option.text" v-bind:key="`option-${index}`">
          <input 
            v-bind:type="type"
            v-bind:id="option.text"
            v-bind:value="option.value"
            v-on:input="handleInput(formItem.value, $event)"
            v-on:blur="handleBlur"
            v-bind:class="{
              'has-error': showError,
            }"
            :checked="isChecked(formItem.value, option.value)"
          >
          {{option.text}}
        </label>&nbsp;&nbsp;
      </template>
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
      default: 'checkbox',
    },
  },

  methods: {
    isChecked(listValues, _thisValue) { return listValues.includes(_thisValue); },
    handleInput(model, evt) {
      const value = evt.target.getAttribute('value');
      if(evt.target.checked) {
        model.push(value);
      } else {
        model = this.$_.without(model, value);
      }
      this.$emit('input', model);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
