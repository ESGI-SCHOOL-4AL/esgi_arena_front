import Vue from "vue"

import BIcon from "~/components/Icon.vue"

const components = {
  BIcon
}

Object.entries(components).forEach(([name, component]) => {
  Vue.component(name, component)
})
