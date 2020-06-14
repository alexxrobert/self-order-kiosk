import axios from 'axios'
import { ItemGroup } from '@/models';

export default class TabacoGroupApi {
  constructor() {
    this.locale = ''
    this.virtualPath = ''
  }

  async list() {
    const path = `${process.env.VUE_APP_API_BASE_URL}${this.virtualPath}/menu/${this.locale}/tabaco-groups.json`
    const response = await axios.get(path)

    if (response && response.status === 200) {
      return response.data.tabacoGroups.map(params => new ItemGroup(params))
    }

    return null
  }
}
