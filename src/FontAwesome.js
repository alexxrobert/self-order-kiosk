import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'

import {
  faArrowLeft,
  faArrowRight,
  faBackspace,
  faCheck,
  faMinus,
  faPlus,
  faShoppingBag,
  faSyncAlt,
  faTimesCircle,
  faUtensils,
  faTrash-alt
} from '@fortawesome/free-solid-svg-icons'

import {
  faSmile
} from '@fortawesome/free-regular-svg-icons'

library.add(faArrowLeft)
library.add(faArrowRight)
library.add(faBackspace)
library.add(faCheck)
library.add(faMinus)
library.add(faPlus)
library.add(faTrash-alt)
library.add(faShoppingBag)
library.add(faSmile)
library.add(faSyncAlt)
library.add(faTimesCircle)
library.add(faUtensils)

export default {
  install (Vue) {
    Vue.component('FontAwesome', FontAwesomeIcon)
  }
}
