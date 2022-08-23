import { defineStore } from 'pinia'

import { getHotCity, getHomeCategories, getHomeHotList } from '@/service/modules/home'

export const useHomeStore = defineStore('home', {
    state: () => ({
        HotCity: [],
        categories: [],
        hotList: [],
        currentPage: 1
    }),
    actions: {
        async getHotCity() {
            const result = await getHotCity()
            this.HotCity = result
        },
        async getCategories() {
            const result = await getHomeCategories()
            this.categories = result
        },
        async getHotList() {
            const result = await getHomeHotList(this.currentPage)
            this.hotList.push(...result)
            this.currentPage++
        }
    }
})