export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig(event)
    const cookies = parseCookies(event)
    const body = await readBody(event)
    const data = await fetch(config.api_v1 + '/wishlist/toggle/', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'X-Api-Key': config.apiKey,
            'Authorization': `Bearer ${cookies.token}`
        },
        body: JSON.stringify(body)
    })
    return data
})