import { defineStore } from 'pinia'
import { getCity } from '../../service/modules/city'

export const useCityStore = defineStore('city', {
    state: () => ({
        allCity: {},
        currentCity: {
            cityId: 10,
            cityName: "成都",
            gangAoTai: false,
            hot: false,
            latitude: "30.6571",
            longitude: "104.082",
            pinYin: "chengdu",
        }
    }),
    actions: {
        async getCity(state, payload) {
            const result = await getCity()
            this.allCity = result.data
        }
    }
})