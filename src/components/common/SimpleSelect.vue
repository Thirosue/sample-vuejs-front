<template>
  <div class="select">
    <select
      v-model="model"
      v-bind:name="nameAttr"
      v-bind="$attrs"
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
</template>

<script>
import { FormSelect } from '@/components/form';

export default {
  mixins: [FormSelect],
  props: {
    label: '',
  },
};
</script>