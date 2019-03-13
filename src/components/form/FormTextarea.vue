<template>
  <div class="field" v-bind:class="inputClassName">
    <label v-if="label" v-bind:for="id">{{ label }}</label>
    <textarea
      class="textarea"
      v-model="model"
      v-bind:id="id"
      v-bind:name="nameAttr"
      v-bind="$attrs"
      v-bind:class="{
        'has-error': showError
      }"
      v-on:input="handleInput"
      v-on:blur="handleBlur"
    />
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
