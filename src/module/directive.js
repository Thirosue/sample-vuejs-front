const disable = (el, binding) => el.disabled = binding.value
const required = (el, binding) => el.required = binding.value
const focus = (el) => el.focus()

export default {
    disable,
    required,
    focus,
}