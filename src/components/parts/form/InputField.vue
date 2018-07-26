<template>
  <div class="field">
    <label v-if="label" class="label">{{label}}</label>
    <div class="control">
      <input class="input" v-bind:id="id" v-on:input="change" 
        v-bind:type="type" v-bind:name="name" v-bind:data-vv-as="label?label:name" v-validate="validateRule"
        :class="{'has-error': errors.has(name)}" v-on:keyup.enter="func" v-bind:placeholder="placeholder">
    </div>
    <article v-if="errors.has(name)" class="message is-danger">
      <div class="message-body">
        {{ errors.first(name) }}
      </div>
    </article>
  </div>
</template>

<script>
export default {
  name: 'InputField',
  props: {
    value: {},
    id: {
      type: String,
      required: false
    },
    type: {
      type: String,
      required: false
    },
    label: {
      type: String,
      required: false
    },
    name: {
      type: String,
      required: true
    },
    min: {
      type: Number,
      required: false
    },
    max: {
      type: Number,
      required: false
    },
    required: {
      type: Boolean,
      required: false,
      default: false
    },
    placeholder: {
      type: String,
      required: false
    },
    func: {
      type: Function,
      required: false,
      default: () => {}
    },
  },
  data() {
    return {
      validateRule: ''
    }
  },
  created() {
    //create validate rule
    let rules = []
    if( this.required ) { rules.push('required') }
    if( this.min ) { rules.push('min:' + this.min) }
    if( this.max ) { rules.push('max:' + this.min) }    
    if( this.type === 'email' ) { rules.push('email') }
    this.validateRule = rules.join('|')
  },
  methods: {
    change(event) {
      this.$emit('input', event.target.value)
    },
  },
  watch: {
    async value(event) {
      const result = await this.$validator.validateAll()
      this.$emit('error', result)
    },
  },
}
</script>
