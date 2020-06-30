
import axios from 'axios'
import { ActivateTabaco } from '@/models';

export default class ActivateTabacoApi {
  constructor() {
    this.virtualPath = ''
  }

  async get(data) {
    const path = `${process.env.VUE_APP_API_BASE_URL}${this.virtualPath}/t.php`
    const response = await axios.post(path,data)
    if (response && response.status === 200) {
      return new ActivateTabaco(response.data)
    }

    return null
  }
}
