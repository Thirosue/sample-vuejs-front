<template>
  <div class="field">
    <label v-bind:for="id" class="label">{{ label }}</label>
    <div class="control">
      <label :key="`option-${index}`"
              :for="option.text"
              class="checkbox"
              v-for="(option, index) in formItem.options"
      >
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
        {{option.text}}&nbsp;&nbsp;
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
      default: 'checkbox',
    },
  },

  methods: {
    isChecked(listValues, _thisValue) { return listValues.includes(_thisValue); },
    handleInput(model, evt) {
      const { value } = evt.target;
      let mdl = model;
      if (evt.target.checked) {
        mdl.push(value);
      } else {
        mdl = this.$_.without(mdl, value);
      }
      this.$emit('input', mdl);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
