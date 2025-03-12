import { defineStore } from 'pinia'

export const useSettingsStore = defineStore('settings', {
    state: () => ({
        settings: null,
        about: null,
        contact: null,
    }),
    actions: {
        async getSettings() {
            const { data, status } = await useFetch<null>('/api/settings/main', {
                method: "get"
            })
            if (data.value && status.value === "success") {
                this.settings = data.value
            } else {
                this.settings = null
            }
        }
    }
})