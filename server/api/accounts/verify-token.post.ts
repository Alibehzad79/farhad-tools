export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig(event)
    const cookies = parseCookies(event)
    const data = fetch(config.api_v1 + '/accounts/token/verify/', {
        method: "post",
        headers: {
            "Content-Type": "application/json",
            "X-Api-Key": config.apiKey,

        },
        body: JSON.stringify({
            "token": cookies.token
        })
    })
    return data
})