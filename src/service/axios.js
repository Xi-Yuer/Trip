import axios from 'axios'
import useMainStore from '@/stores/modules/main'

import { BASE_URL } from './config'

const mainStore = useMainStore()

class Request {
    constructor(baseURL, timeOut) {
        this.instance = axios.create({
            baseURL,
            timeOut
        })
        this.instance.interceptors.request.use((config => {
            mainStore.isLoading = true
            return config
        }), (err) => {
            mainStore.isLoading = false
        })
        this.instance.interceptors.response.use((data) => {
            mainStore.isLoading = false
            return data
        }, (err) => {
            mainStore.isLoading = false
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