import is from 'is_js';
import { BaseFormItem } from '@/lib';
import { setValidator } from '@/conf/ValidatorMappings';

const createInitialStates = () => ({
  touched: false,
  touchedAfterDirty: false,
});

const splitFirst = (value, delimiter) => {
  const pos = value.indexOf(delimiter);
  return pos === -1 ? [value] : [value.substring(0, pos), value.substring(pos).trim()];
};

const formItemMixin = {
  props: {
    value: {
      // type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
    formItem: {
      type: BaseFormItem,
      required: true,
    },
    label: {
      type: String,
      required: false,
    },
    name: {
      type: String,
      default: '',
    },
    dirty: {
      type: Boolean,
      default: false,
    },
    touched: {
      type: Boolean,
      default: false,
    },
    touchedAfterDirty: {
      type: Boolean,
      default: false,
    },
    rule: {
      type: String,
      required: false,
    },
    searchHandler: {
      type: Function,
      default: null,
    },
    keyUpHandler: {
      type: Function,
      default: null,
    },
  },

  data() {
    return {
      states: createInitialStates(),
    };
  },

  created() {
    if (is.not.undefined(this.rule) && is.not.empty(this.rule)) {
      const rules = this.rule.split('|');
      rules.map(value => splitFirst(value, ' ')).forEach(([_rule, _prop]) => setValidator(this.formItem, _rule, _prop));
    }
  },

  computed: {
    nameAttr() {
      return this.name || this.id;
    },

    isDirty() {
      return this.formItem.states.dirty;
    },

    isTouched() {
      return this.states.touched;
    },

    isTouchedAfterDirty() {
      return this.states.touchedAfterDirty;
    },

    attrShowErrorConditions() {
      if (this.dirty) {
        if (this.isDirty === false) {
          return false;
        }
      }
      if (this.touched) {
        if (this.isTouched === false) {
          return false;
        }
      }
      if (this.touchedAfterDirty) {
        if (this.isTouchedAfterDirty === false) {
          return false;
        }
      }
      return true;
    },

    messages() {
      return this.formItem.messages;
    },

    invalid() {
      return this.formItem.invalid;
    },

    showError() {
      return this.invalid && this.attrShowErrorConditions;
    },
  },

  methods: {
    handleInput(evt) {
      const { value } = evt.target;
      this.$emit('input', value);
    },

    handleBlur() {
      this.states.touched = true;
      if (this.isDirty) {
        this.states.touchedAfterDirty = true;
      }
      this.validate();
    },

    onKeyUpHandler() {
      if (is.not.null(this.searchHandler)) {
        this.searchHandler.call(null, 1); // 1ページ目固定
      } else if (is.not.null(this.keyUpHandler)) {
        this.keyUpHandler.call(null);
      }
    },

    validate() {
      this.formItem.validate();
    },

    resetStates() {
      this.states = createInitialStates();
      this.formItem.resetStates();
    },
  },
};

export default formItemMixin;
