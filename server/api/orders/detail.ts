export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig(event)
    const cookies = parseCookies(event)
    const query = getQuery(event)
    const data = await fetch(config.api_v1 + "/orders/detail/?order_id=" + query.order_id, {
        method: "get",
        headers: {
            'Content-Type': 'application/json',
            'X-Api-Key': config.apiKey,
            'Authorization': `Bearer ${cookies.token}`
        },
    })
    return data
})