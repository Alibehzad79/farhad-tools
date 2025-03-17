import { useStorage } from '@vueuse/core'
const uiPrimary = useStorage('nuxt-ui-primary', 'indigo');

export default defineAppConfig({
    ui: {
        primary: uiPrimary.value?.toString() ?? 'indigo',
        gray: 'cool',
        horizontalNavigation: {
            label: 'text-md'
        },
        verticalNavigation: {
            label: 'text-md'
        },
        button: {
            rounded: 'rounded-lg',
            default: {
                size: "md",
                loadingIcon: 'svg-spinners:90-ring-with-bg'
            },

        },
        chip: {
            default: {
                size: '3xl',
            },
        },
        badge: {},
        input: {
            default: {
                size: 'md'
            }
        },


    },
})