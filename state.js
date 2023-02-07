const state = {
  users: null,
}
const setState = function (key, val) {
  state['key'] = val;
  const selector = `[data-bind=${key}]`
  const attribute = `data-${key}`
  Array.from(document.querySelectorAll(selector)).forEach((el) => {
    el.setAttribute(attribute, val)
  })
}
export { state, setState }
