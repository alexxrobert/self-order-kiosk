import axios from 'axios'
import { Payment } from '@/models';

export default class PaymentApi {
  constructor() {
    this.virtualPath = ''
  }

  async get(amm) {
    const path = `${process.env.VUE_APP_API_BASE_URL}${this.virtualPath}/p.php`
    //const response = await axios.post(path,{'ammount':amm})
    const response = await axios.post(path,this.session.order)
    if (response && response.status === 200) {
      return new Payment(response.data)
    }

    return null
  }
}
