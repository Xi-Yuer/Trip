import { defineStore } from "pinia";

export default defineStore('main', {
    state() {
        return {
            startDate: new Date(),
            endDate: new Date().setDate(new Date().getDate() + 1),
            isLoading: false
        }
    }
})