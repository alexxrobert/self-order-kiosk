export default class Payment {
  constructor(params = {}) {
    this.timer = params.timer || ''
    this.paymentstatus = params.paymentstatus || ''
    this.ammount = params.ammount || ''
    this.cambio = params.cambio || ''
  }
}
