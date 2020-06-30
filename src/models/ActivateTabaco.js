export default class ActivateTabaco {
  constructor(params = {}) {
    this.timer = params.timer || ''
    this.activated = params.activated || false
  }
}
