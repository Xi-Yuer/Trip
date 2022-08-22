import axios from 'axios'

import { BASE_URL } from './config'

class Request {
    constructor(baseURL, timeOut) {
        this.instance = axios.create({
            baseURL,
            timeOut
        })
    }
    request(config) {
        return new Promise((resolve, reject) => {
            this.instance.request(config).then(res => {
                resolve(res.data)
            }).catch(err => {
                reject(err)
            })
        })
    }
    get(config) {
        return this.request({ ...config, method: 'GET' })
    }
    post(config) {
        return this.request({ ...config, method: 'POST' })
    }
}


export default new Request(BASE_URL, 10000)