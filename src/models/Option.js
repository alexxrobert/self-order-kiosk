export default class Option {
  constructor(params = {}) {
    this.id = params.id || ''
    this.name = params.name || ''
    this.price = params.price || 0
    this.checked = params.checked || false
    this.modifier = params.modifier || false
    this.takeout = params.takeout || 'mixto'
    this.outofstock =  params.outofstock || false
    this.more =  params.more || false
    this.less =  params.less || false

  }
}
