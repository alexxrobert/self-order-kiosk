import AuthApi from './AuthApi'
import ItemGroupApi from './ItemGroupApi'
import TabacoGroupApi from './TabacoGroupApi'
import ItemApi from './ItemApi'
import OptionGroupApi from './OptionGroupApi'
import OptionApi from './OptionApi'
import SettingsApi from './SettingsApi'
import PaymentApi from './PaymentApi'
import PaymentTabacoApi from './PaymentTabacoApi'
import TabacoApi from './TabacoApi'
import ActivateTabacoApi from './ActivateTabacoApi'

class Api {
  constructor() {
    this._locale = ''
    this._virtualPath = ''
    this._token = ''
    this.auth = new AuthApi()
    this.itemGroups = new ItemGroupApi()
    this.tabacoGroups = new TabacoGroupApi()
    this.items = new ItemApi()
    this.optionGroups = new OptionGroupApi()
    this.options = new OptionApi()
    this.settings = new SettingsApi()
    this.payment = new PaymentApi()
    this.paymenttabaco new PaymentTabacoApi()
    this.tabaco = new TabacoApi()
    this.activatetabaco = new ActivateTabacoApi()
  }

  get locale() {
    return this._locale
  }

  set locale(value) {
    this._locale = value
    this.items.locale = value
    this.itemGroups.locale = value
    this.tabacoGroups.locale = value
    this.optionGroups.locale = value
    this.options.locale = value
  }

  get virtualPath() {
    return this._virtualPath
  }

  set virtualPath(value) {
    this._virtualPath = value ? `/${value}` : ''
    this.items.virtualPath = this._virtualPath
    this.tabacoGroups.virtualPath = this._virtualPath
    this.itemGroups.virtualPath = this._virtualPath
    this.optionGroups.virtualPath = this._virtualPath
    this.options.virtualPath = this._virtualPath
    this.settings.virtualPath = this._virtualPath
    this.payment.virtualPath = this._virtualPath
    this.paymenttabaco.virtualPath = this._virtualPath
    this.tabaco.virtualPath = this._virtualPath
    this.activatetabaco.virtualPath = this._virtualPath
    
  }

  get token() {
    return this._token
  }

  set token(value) {
    this._token = `Bearer ${value}`
  }
}

export default {
  install (Vue) {
    Vue.prototype.$api = new Api()
  }
}
