export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig(event)
    const body = await readBody(event)
    const data = await fetch(config.api_v1 + '/accounts/send-reset-password-email/', {
        method: "post",
        headers: {
            "Content-Type": "application/json",
            "X-Api-Key": config.apiKey
        },
        body: JSON.stringify(body)
    })
    return data
})