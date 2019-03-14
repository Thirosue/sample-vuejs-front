import is from 'is_js';
import BaseFormItem from './BaseFormItem';

export default class BaseForm {
  constructor() {
    this._items = {};
    this._invalid = false;
    return this;
  }

  get items() {
    return this._items;
  }

  get invalid() {
    return this._invalid;
  }

  addItem(name, item) {
    if (item instanceof BaseFormItem === false) {
      throw new Error(
        '[BaseForm] Item must be an instance of the extended BaseFormItem class',
      );
    }
    this._items[name] = item;
    this._items[name].addInvalidObserver((invalid) => {
      this._updateState(invalid);
    });
    this.updateState();
    return this;
  }

  removeItem(name) {
    if (is.not.undefined(this._items[name])) {
      delete this._items[name];
    }
    this.updateState();
    return this;
  }

  addRelationshipValidator({ names, validator, message }) {
    names.filter(name => name in this._items === false).forEach((name) => {
      throw new Error(`[BaseForm] ${name} is not set item`);
    });
    names.forEach((name) => {
      this._items[name].addValueObserver(() => {
        if (validator.call(this)) {
          this._removeMessages(names, message);
        } else {
          this._addMessages(names, message);
        }
      });
    });
    return this;
  }

  _addMessages(names, message) {
    names.forEach((name) => {
      this._items[name].addMessage(message);
    });
  }

  _removeMessages(names, message) {
    names.forEach((name) => {
      this._items[name].removeMessage(message);
    });
  }

  setValues(newValues) {
    Object.entries(newValues)
      .filter(([name]) => is.not.undefined(this._items[name])).forEach(([name, value]) => {
        this._items[name].value = value;
      });
  }

  values() {
    return Object.entries(this.items)
      .reduce(
        (o, [name, item]) => ({ ...o, [name]: item.value }),
        {},
      );
  }

  notNullValues() {
    return Object.entries(this.values())
      .filter(([, val]) => is.not.empty(val) && is.not.null(val)) // 空文字を除去
      .reduce(
        (o, [name, val]) => ({ ...o, [name]: val }),
        {},
      );
  }

  isDirty() {
    return Object.keys(this._items).some(key => this._items[key].states.dirty);
  }

  resetState() {
    Object.keys(this._items).forEach(key => this._items[key].resetStates());
    this._invalid = this._checkItemsInvalid();
    return this;
  }

  updateState() {
    Object.keys(this._items).forEach(key => this._items[key].validate());
    this._invalid = this._checkItemsInvalid();
    return this;
  }

  _updateState(invalid) {
    if (invalid === false) {
      this._invalid = this._checkItemsInvalid();
    } else {
      this._invalid = true;
    }
  }

  _checkItemsInvalid() {
    return Object.keys(this._items).some(name => this._items[name].invalid);
  }
}
