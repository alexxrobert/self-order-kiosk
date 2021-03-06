import axios from 'axios'
import { Settings } from '@/models';

export default class SettingsApi {
  constructor() {
    this.virtualPath = ''
  }

  async get() {
    const path = `${process.env.VUE_APP_API_BASE_URL}${this.virtualPath}/app.json`
    const response = await axios.get(path)

    if (response && response.status === 200) {
      return new Settings(response.data)
    }

    return null
  }
}
