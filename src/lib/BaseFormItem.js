export default class BaseFormItem {
  constructor(value = '') {
    this._value = value;
    this._messages = [];
    this._validators = [];
    this._valueObservers = [];
    this._invalidObservers = [];
    this._invalid = false;
    this._states = {};

    this._createInitialState();
    this._createObserver();
    return this;
  }

  get messages() {
    return this._messages;
  }

  get invalid() {
    return this._invalid;
  }

  get states() {
    return this._states;
  }

  addMessage(message) {
    if (this._messages.includes(message) === false) {
      this._messages.push(message);
    }
    this._updateInvalid();
    return this;
  }

  removeMessage(message) {
    const index = this._messages.findIndex(_message => message === _message);
    if (index !== -1) {
      this._messages.splice(index, 1);
    }
    this._updateInvalid();
    return this;
  }

  addValidator({ validator, message, stop = false }) {
    this._validators.push({
      validator,
      message,
      stop,
    });
    return this;
  }

  removeValidator({ message }) {
    const index = this._validators.findIndex(validator => validator.message === message);
    if (index !== -1) {
      this._validators.splice(index, 1);
      this.removeMessage(message);
    }
    return this;
  }

  validate() {
    this._validators.some(({ validator, message, stop }) => {
      if (validator.call(this, this.value) === false) {
        this.addMessage(message);
        if (stop === true) {
          return true; // break
        }
      } else {
        this.removeMessage(message);
      }
      return false;
    });
    return this;
  }

  addValueObserver(observer) {
    this._valueObservers.push((value) => {
      observer.call(this, value);
    });
    return this;
  }

  addInvalidObserver(observer) {
    this._invalidObservers.push((invalid) => {
      observer.call(null, invalid);
    });
    return this;
  }

  resetStates() {
    this._createInitialState();
    return this;
  }

  _createInitialState() {
    this._invalid = false;
    this._states = {
      dirty: false,
    };
  }

  _updateInvalid() {
    const invalid = this.messages.length > 0;
    if (invalid === this._invalid) {
      return;
    }
    this._invalid = invalid;
    this._notifyInvalidObservers(invalid);
  }

  _notifyInvalidObservers(invalid) {
    this._invalidObservers.forEach((observer) => {
      observer(invalid);
    });
  }

  _notifyValueObserver(value) {
    this._valueObservers.forEach((observer) => {
      observer(value);
    });
  }

  _createObserver() {
    Object.defineProperty(this, 'value', {
      get() {
        return this._value;
      },
      set(value) {
        this._value = value;
        this.states.dirty = true;
        this.validate();
        this._notifyValueObserver(value);
      },
    });
  }
}
