import Currency from './Currency'
import Currency2 from './Currency2'
import IdleTime from './IdleTime'
import Keyboard from './Keyboard'
import Loader from './Loader'
import Logo from './Logo'
import ProgressiveImage from './ProgressiveImage'
import SafeArea from './SafeArea'

export default {
  install (Vue) {
    Vue.component('Currency', Currency)
    Vue.component('IdleTime', IdleTime)
    Vue.component('Keyboard', Keyboard)
    Vue.component('Loader', Loader)
    Vue.component('Logo', Logo)
    Vue.component('ProgressiveImage', ProgressiveImage)
    Vue.component('SafeArea', SafeArea)
  }
}
