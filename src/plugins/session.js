class AppSession {
  constructor() {
    this.code = ''
    this.theme = ''
    this.locale = ''
    this.order = null
    this.itemGroup = null
    this.item = null
    this.started = false
  }

  addItemToOrder() {
    this.order.add(this.item)
    this.itemGroup = null
    this.item = null
  }
}

export default {
  install (Vue) {
    Vue.prototype.$session = new AppSession()

    Vue.mixin({
      data() {
        return {
          session: this.$session
        }
      }
    })
  }
}
