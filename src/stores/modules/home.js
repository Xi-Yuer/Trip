import { defineStore } from 'pinia'

import { getHotCity, getHomeCategories } from '@/service/modules/home'

export const useHomeStore = defineStore('home', {
    state: () => ({
        HotCity: [],
        categories: []
    }),
    actions: {
        async getHotCity() {
            const result = await getHotCity()
            this.HotCity = result
        },
        async getCategories() {
            const result = await getHomeCategories()
            this.categories = result
        }
    }
})