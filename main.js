// TBD
import { state } from '/state'

const fetchUsers = async function () {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=15')
  //const response = await fetch('/thing.json')
  const data = await response.json()
  let results = data['results']
  results.map(async (r) => {
    let detail = await fetch(r.url)
    detail = await detail.json()
    r['image'] = detail['sprites']['front_default']
    r['id'] = detail['id']
    return r
  })
  state['users'] = results
  return state
}

const useForLoop = function (cmp, data) {
  // this is janky and not really generic at all
  setTimeout(() => {
    let dataset = Array.from(cmp.children).flatMap((child) => {
      return Object.values(child.dataset)
    })
    const fragment = new DocumentFragment()
    data.forEach((v) => {
      const component = cmp.cloneNode()
      const reg = /.*\/pokemon\/(\d+)/
      let id = v['url'].match(reg)[1]
      component.setAttribute('data-id', id)
      dataset.forEach((value) => {
        // TODO how to make more generic for children or unnamed slots?
        const span = document.createElement('span');
        span.setAttribute('slot', value)
        span.textContent = v[value]
        component.append(span)
      })
      fragment.append(component)
    })
    cmp.parentNode.replaceChild(fragment, cmp)
  })
}


export { fetchUsers, useForLoop }
