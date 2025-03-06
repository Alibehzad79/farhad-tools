export default defineAppConfig({
    ui: {
        primary: 'indigo',
        gray: 'cool',
        horizontalNavigation: {
            label: 'text-md'
        },
        verticalNavigation: {
            label: 'text-md'
        },
        button: {
            rounded: 'rounded-xl',
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