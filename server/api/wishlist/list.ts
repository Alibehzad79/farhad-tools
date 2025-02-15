export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig(event)
    const cookies = parseCookies(event)
    const data = await fetch(config.api_v1 + '/wishlist/list/', {
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
            'X-Api-Key': config.apiKey,
            'Authorization': `Bearer ${cookies.token}`
        }
    })
    return data
})