import { defineStore } from 'pinia'

import { getHotCity } from '@/service/modules/home'

export const useHomeStore = defineStore('home', {
    state: () => ({
        HotCity: [],
        categories: []
    }),
    actions: {
        async getHotCity() {
            const result = await getHotCity()
            this.HotCity = result
        }
    }
})