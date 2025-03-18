import { defineStore } from 'pinia'

export const useSettingsStore = defineStore('settings', {
    state: () => ({
        settings: null,
        about: null,
        notification: null
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
        },
        async getAbout() {
            const { data, status } = await useFetch<null>('/api/settings/about', {
                method: "get"
            })
            if (data.value && status.value === "success") {
                this.about = data.value
            } else {
                this.about = null
            }
        },
        async addContact(body: object) {
            const { status } = await useFetch('/api/settings/contact', {
                method: "post",
                body: JSON.stringify(body)
            })
            return status.value
        },
        async getNotification() {
            const { data, status } = await useFetch<null>('/api/settings/notification', {
                method: "get"
            })
            if (data.value && status.value === "success") {
                this.notification = data.value
            } else {
                this.notification = null
            }
        },
    }
})