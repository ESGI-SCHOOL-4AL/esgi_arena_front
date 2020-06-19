import Vue from "vue"

import BIcon from "~/components/Icon.vue"
import BNavbar from "~/components/Navbar.vue"

const components = {
  BIcon,
  BNavbar
}

Object.entries(components).forEach(([name, component]) => {
  Vue.component(name, component)
})
