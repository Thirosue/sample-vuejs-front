export default {
  props: {
    value: {},
    size: {
      type: Number,
      required: false,
    },
    disable: {
      type: Boolean,
      required: false,
      default: false
    },
    required: {
      type: Boolean,
      required: false,
      default: false
    },
  },
  methods: {
    change(event) {
      this.$emit('input', event.target.value)
    },
  },
  template: `
    <div class="select">
      <select :size=size v-bind:value="value" v-on:change="change" v-disable="disable">
        <option value="" v-if="!required">選択してください</option>
        <option v-for="(row, i) in targetList" v-bind:key="i" v-bind:value="row.key">{{row.value}}</option>
      </select>
    </div>
  `
}