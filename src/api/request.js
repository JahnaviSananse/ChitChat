import axios from 'axios'
import evn from '../environment/env'

class Request {
  // public axios: AxiosInstance;
  api
  isConnected = false
  constructor() {
    this.api = axios.create({
      baseURL: evn.API_URL,
      timeout: 100000,
    })
  }

  async authCall(config, token) {
    try {
      let headers = {
        'accept-language': 'en',
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'api-key':
          'SebAlLL2Q8mTWrGRfNinCyWkG4FriCvDa2aYfnYWq9sLG2gqiaomUp4Fwxk0pARz',
      }
      if (token) {
        headers.token = token
      }
      config.data.device_token = 0
      config.data.device_type = 'A'
      config.data.device_model = 'test'
      console.log('Request', config)
      const res = await this.api.request({
        headers,
        ...config,
      })
      console.log('REs', res)
      return res.data
    } catch (error) {
      throw error.response.data
    }
  }
}

export default new Request()
