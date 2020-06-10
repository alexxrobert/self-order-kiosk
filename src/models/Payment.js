export default class Payment {
  constructor(params = {}) {
    this.timer = params.timer || ''
    this.paymentstatus = params.paymentstatus || ''
    this.opid = params.opid || 0
    this.ammount = params.ammount || ''
    this.cambio = params.cambio || ''
    this.totalpaid = params.totalpaid || ''
  }
}
