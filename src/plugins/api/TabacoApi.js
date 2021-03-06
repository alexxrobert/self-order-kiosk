
import axios from 'axios'
import { Tabaco } from '@/models';

export default class TabacoApi {
  constructor() {
    this.locale = ''
    this.virtualPath = ''
  }

  async list(TabacoId) {
    //const path = `${process.env.VUE_APP_API_BASE_URL}${this.virtualPath}/menu/${this.locale}/items/${TabacoId}.json`
    const path = `${process.env.VUE_APP_API_BASE_URL}${this.virtualPath}/menu/es/items/tabaco${TabacoId}.json?timestamp=${new Date().getTime()}`
    const response = await axios.get(path)

    if (response && response.status === 200) {
      return response.data.items.map(params => new Tabaco(params))
    }

    return null
  }
}
